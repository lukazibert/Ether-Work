pragma solidity ^0.8.17;

contract Escrow {
    // The address of the arbitrator
    address private arbitrator;
    // The state of the escrow
    // 0 - Inactive
    // 1 - Active
    // 2 - Payed
    // 3 - Release
    // 4 - Refund
    uint private state = 0;
    // The amount of ETH in the escrow
    uint private amount;
    // The address of the client
    address payable private client;
    // The address of the freelancer
    address payable private freelancer;

    // Events for logging
    event LogFundsDeposited(address indexed _from, uint _value);

    modifier isPayed() {
        require(state == 2, "Escrow is not payed for");
        _;
    }

    // Constructor function
    constructor(
        address payable _client,
        address payable _freelancer,
        uint _amount
    ) payable {
        require(
            _amount == msg.value,
            "The amount deposited must be equal to the escrow amount"
        );
        arbitrator = msg.sender;
        state = 2;
        amount = _amount;
        client = _client;
        freelancer = _freelancer;
    }

    event FundsReleased(address indexed freelancer, uint amount);
    event FundsRefunded(
        address indexed client,
        address indexed freelancer,
        uint clientAmount,
        uint freelancerAmount
    );

    function releaseFunds() public {
        uint balance = address(this).balance;
        
        require(balance > 0, "No funds available to release");

        state = 3;

        (bool success, ) = payable(freelancer).call{value: amount * 2, gas: 10000}("");

        require(success, "Failed to send funds");

        emit FundsReleased(freelancer, balance); // Emit event for frontend
    }

    function refundFunds() public {
        uint balance = address(this).balance;
        require(balance > 0, "No funds available to refund");
        state = 4;
        
        (bool success, ) = payable(client).call{value: amount, gas: 10000}("");

        require(success, "Failed to send funds");

        (bool successFreelancer, ) = payable(freelancer).call{value: amount, gas: 10000}("");

        require(successFreelancer, "Failed to send funds");

        emit FundsRefunded(client, freelancer, amount, amount); // Emit event for frontend
    }

    // Function to send report to the arbitrator
    function sendReport() public view returns (uint) {
        return state;
    }

    // Method to get escrow details
    function getEscrowDetails()
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
        return (client, freelancer, amount, state, arbitrator);
    }

    // Function to destroy the contract
    function destroy() public {
        require(
            msg.sender == arbitrator,
            "Only the arbitrator can destroy the contract"
        );
        selfdestruct(payable(arbitrator));
    }
}
