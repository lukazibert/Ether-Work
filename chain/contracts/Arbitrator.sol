pragma solidity ^0.8.17;

import "./Escrow.sol";

contract Arbitrator {
    // TODO: change to private after testing
    // mapping(uint => Escrow) private escrowContracts;
    mapping(bytes32 => Escrow) public escrowContracts;
    uint public escrowContractCount = 0;

    address public arbitrator;

    modifier arbitratorOnly() {
        require(
            msg.sender == arbitrator,
            "Only the arbitrator can call this function"
        );
        _;
    }

    struct JobContract {
        address freelancer;
        address client;
        uint amount;
        // bool clientPaid;
        // bool freelancerPaid;
    }

    // TDOD: change to private after testing
    // mapping(uint => JobContract) private jobContracts;
    mapping(bytes32 => JobContract) public jobContracts;
    uint public jobContractCount = 0;

    constructor() payable {
        arbitrator = msg.sender;
    }

    //Getters
    function getArbitratorAddress() public view returns (address) {
        return arbitrator;
    }

    function getJobCount() public view returns (uint) {
        return jobContractCount;
    }

    function getArbitratorBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getEscrowContractState(bytes32 jobId) public view returns (uint) {
        return escrowContracts[jobId].sendReport();
    }

    function getClientAddress(bytes32 jobId) public view returns (address) {
        return jobContracts[jobId].client;
    }

    function getFreelancerAddress(bytes32 jobId) public view returns (address) {
        return jobContracts[jobId].freelancer;
    }

    // Create job contract
    function createJobContract(bytes32 _jobId, uint _amount) public payable {
        require(
            msg.value == _amount,
            "The amount deposited must be equal to the job amount"
        );
        jobContracts[_jobId] = JobContract(address(0), msg.sender, _amount);
        jobContractCount++;
    }

    // Freelancer accepts job contract request
    function acceptJobContract(bytes32 _jobId) public payable {
        require(
            msg.value == jobContracts[_jobId].amount,
            "The amount deposited must be equal to the escrow amount"
        );
        // require(
        //     jobContracts[_jobId].client != address(0),
        //     "Clients already made a request for the job"
        // );

        jobContracts[_jobId].freelancer = msg.sender;

        createEscrow(
            payable(jobContracts[_jobId].client),
            payable(jobContracts[_jobId].freelancer),
            jobContracts[_jobId].amount * 2,
            _jobId
        );
        escrowContractCount++;
    }

    function rejectJobContract(bytes32 _jobId) public payable {
        // require(jobContracts[_jobId].client != address(0), "Client does exist");
        // Refund the client becouse the freelancer rejected the job
        // payable(jobContracts[_jobId].client).transfer(
        //     jobContracts[_jobId].amount
        // );

        bool success = payable(jobContracts[_jobId].client).send(
            jobContracts[_jobId].amount
        );
        require(success, "Transfer failed.");

        // Delete the job contract
        delete jobContracts[_jobId];
        jobContractCount--;
    }

    // Create a new escrow contract
    function createEscrow(
        address payable _client,
        address payable _freelancer,
        uint _amount,
        bytes32 _jobId
    ) private {
        //  TODO: check if this require statment is neccessary
        // require(
        //     jobContracts[_jobId].freelancerPaid == true &&
        //         jobContracts[_jobId].clientPaid == true,
        //     "Client or freelancer has not paid"
        // );

        // Create a new escrow contract and store its ID in a local variable
        escrowContracts[_jobId] = new Escrow{
            value: jobContracts[_jobId].amount * 2
        }(_client, _freelancer, _amount);
    }

    //return report/status of the escrow contract
    function getEscrowStatus(
        bytes32 _jobId
    ) public view arbitratorOnly returns (uint) {
        return escrowContracts[_jobId].sendReport();
    }

    // Method to get escrow details via Arbitrator contract
    function getEscrowInfo(
        bytes32 _jobId
    )
        public
        view
        returns (
            address clientAddress,
            address freelancerAddress,
            uint currentAmount,
            uint currentState,
            address currentArbitrator
        )
    {
        Escrow escrow = escrowContracts[_jobId];
        return escrow.getEscrowDetails();
    }

    //TODO: resolve dispute
    // function resolveDispute(bytes32 _jobId) public arbitratorOnly {
    //     // escrowContracts[_jobId].releaseFunds();
    // }

    event FundsReleased(
        address indexed freelancer,
        uint amount,
        bytes32 jobId,
        uint timestamp,
        string message
    );

    //releas escrow contract
    function releaseEscrow(bytes32 _jobId) public {
        require(
            jobContracts[_jobId].client == msg.sender,
            "Only the client can release the funds"
        );
        escrowContracts[_jobId].releaseFunds();

        emit FundsReleased(
            jobContracts[_jobId].freelancer,
            jobContracts[_jobId].amount,
            _jobId,
            block.timestamp,
            "Funds released to freelancer"
        );
    }

    //refund escrow contract
    function refundEscrow(bytes32 _jobId) public {
        require(
            jobContracts[_jobId].client == msg.sender,
            "Only the client can refund the funds"
        );
        escrowContracts[_jobId].refundFunds();
    }

    function payDeveloper(bytes32 _jobId) public payable {
        require(
            jobContracts[_jobId].client == msg.sender,
            "Only the client can pay the developer"
        );
        
        uint amount = jobContracts[_jobId].amount;

        (bool success, ) = payable(jobContracts[_jobId].freelancer).call{value: amount, gas: 10000}("");

        require(success, "Failed to send funds");

        emit FundsReleased(
            jobContracts[_jobId].freelancer,
            amount,
            _jobId,
            block.timestamp,
            "Funds released to freelancer"
        );
    }

    receive() external payable {} // to support receiving ETH by default
    fallback() external payable {} // to support sending ETH by default
}
