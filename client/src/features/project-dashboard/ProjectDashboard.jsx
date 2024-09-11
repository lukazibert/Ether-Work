import { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Web3 from "web3";

import arbitrator from "../../contracts/Arbitrator.json";

export default function ProjectDashboard() {
    const [project, setProject] = useState({});
    const [developer, setDeveloper] = useState({});
    const [client, setClient] = useState({});
    const [githubRepo, setGithubRepo] = useState("");  // Input for developer's GitHub repo
    const [contractInstance, setContractInstance] = useState(null);
    const { projectId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const connectMetaMask = async () => {
            if (window.ethereum) {
                try {
                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    // Initialize web3 with MetaMask's provider
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    console.log('Connected accounts:', accounts);

                    // Optionally store the account or make further use of web3
                } catch (error) {
                    console.error('User denied account access or other error:', error);
                }
            } else {
                console.error('MetaMask not found.');
            }
        };

        connectMetaMask();
        fetchData();
    }, [projectId]);


    const web3 = new Web3(window.ethereum);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5111/projects/${projectId}`);
            console.log('Project data:', response);

            setProject(response.data.project);
            setClient(response.data.client);
            setDeveloper(response.data.developer);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }

        fetchArbitratorContractInstance();

        fetchEscrowDetails(project.jobId);
    };

    const handleWorkSubmit = () => {
        // Handle developer submitting GitHub repo
        console.log('Developer submitted work:', githubRepo);
        // API call to submit the GitHub repo

        // Update the project status to 'Work Submitted'

        // verify that the github repo is valid
        const githubRepoRegex = /^(https:\/\/github.com\/)([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)$/;

        if (!githubRepoRegex.test(githubRepo)) {
            console.error('Invalid GitHub repo URL');
            return;
        }

        updateProjectStatus(projectId, 'Work Submitted', githubRepo);
    };

    const handleClientApprove = async () => {
        // Handle client approving the work
        console.log('Client approved the work');
        // API call to approve work

        const accounts = await web3.eth.getAccounts();

        console.log('Accounts:', accounts);

        // await fetchArbitratorContractInstance();

        console.log('Contract instance:', contractInstance);


        // Create the job contract on the blockchain

        console.log('Project Price:', project.price);


        console.log('JobId', project.jobId);
        

        const gasEstimate = await contractInstance._methods
            .releaseEscrow(project.jobId)
            .estimateGas({ from: accounts[0] });

        console.log('Gas estimate:', gasEstimate);


        const result = await contractInstance._methods
            .releaseEscrow(project.jobId)
            .send({
                from: accounts[0],
                gas: gasEstimate,
                gasPrice: web3.utils.toWei('20', 'gwei')
            });


        const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);

        if (receipt.status) {

            // await fetchEscrowDetails();

            payDeveloper(project.jobId);

            console.log('Job contract created successfully:', receipt);

            await updateProjectStatus(projectId, 'Completed');
        }
    };

    const handleClientReject = async () => {
        // Handle client rejecting the work
        console.log('Client rejected the work');
        // API call to reject work

        const accounts = await web3.eth.getAccounts();

        console.log('Accounts:', accounts);

        // await fetchArbitratorContractInstance();

        console.log('Contract instance:', contractInstance);


        // Create the job contract on the blockchain

        console.log('Project Price:', project.price);

        const gasEstimate = await contractInstance._methods
            .refundEscrow(project.jobId)
            .estimateGas({ from: accounts[0] });

        console.log('Gas estimate:', gasEstimate);


        const result = await contractInstance._methods
            .refundEscrow(project.jobId)
            .send({
                from: accounts[0],
                gas: gasEstimate,
                gasPrice: web3.utils.toWei('20', 'gwei')
            });


        const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);

        if (receipt.status) {

            await fetchEscrowDetails();

            console.log('Job contract created successfully:', receipt);

            await updateProjectStatus(projectId, 'Work Approved');
        }
    };

    const handleDeveloperApproveRequest = async () => {
        // Handle developer approving the project request
        console.log('Developer approved the project request');
        // API call to approve the project request

        const accounts = await web3.eth.getAccounts();

        console.log('Accounts:', accounts);

        // await fetchArbitratorContractInstance();

        console.log('Contract instance:', contractInstance);


        // Create the job contract on the blockchain

        console.log('Project Price:', project.price);

        const gasEstimate = await contractInstance._methods
            .rejectJobContract(project.jobId)
            .estimateGas({ from: accounts[0] });

        console.log('Gas estimate:', gasEstimate);


        const result = await contractInstance._methods
            .acceptJobContract(project.jobId)
            .send({
                from: accounts[0],
                value: web3.utils.toWei(project.price, 'ether'),
                gas: gasEstimate,
                gasPrice: web3.utils.toWei('20', 'gwei')
            });


        const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);

        if (receipt.status) {

            await fetchEscrowDetails();

            console.log('Job contract created successfully:', receipt);

            await updateProjectStatus(projectId, 'Request Approved');
        }

        else {
            console.error('Job contract creation failed:', receipt);
        }


    };

    const handleDeveloperRejectRequest = async () => {
        // Handle developer rejecting the project request
        console.log('Developer rejected the project request');
        // API call to reject the project request

        const accounts = await web3.eth.getAccounts();

        console.log('Accounts:', accounts);


        // await fetchArbitratorContractInstance();

        console.log('Contract instance:', contractInstance);

        console.log('_methods', contractInstance._methods);

        console.log('methods', contractInstance.methods);




        const gasEstimate = await contractInstance._methods
            .rejectJobContract(project.jobId)
            .estimateGas({ from: accounts[0] });

        console.log('Gas estimate:', gasEstimate);


        // Create the job contract on the blockchain
        const result = await contractInstance._methods
            .rejectJobContract(project.jobId)
            .send({
                from: accounts[0],
                gas: gasEstimate,
                gasPrice: web3.utils.toWei('20', 'gwei')
            });


        const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);

        if (receipt.status) {
            console.log('Job contract created successfully:', receipt);

            await fetchEscrowDetails();

            await updateProjectStatus(projectId, 'Request Rejected');
        } else {
            console.error('Job contract creation failed:', receipt);
        }


    };

    const updateProjectStatus = async (projectId, status, githubRepo = project.repo) => {
        console.log('Project ID:', projectId);
        console.log('New Status:', status);

        try {
            // Only send the status field to the backend
            const response = await axios.patch(`http://localhost:5111/projects/${projectId}`, { status, repo: githubRepo });
            console.log('Project status updated:', response.data);
            setProject((prevProject) => ({ ...prevProject, status: response.data.status, repo: response.data.repo }));
        } catch (error) {
            console.error('Failed to update project status:', error);
        }
    };


    const fetchArbitratorContractInstance = async () => {
        try {
            const response = await axios.get('http://localhost:5111/arbitrator/contract-instance');
            const contractData = await response.data;
            console.log('Contract data:', contractData);

            const contract = new web3.eth.Contract(contractData.abi, contractData.address);

            console.log('Contract instance:', contract);

            const latestBlockNumber = await web3.eth.getBlockNumber();
            console.log(`The latest block number is ${latestBlockNumber}`);

            setContractInstance(contract);

            console.log('Contract instance:', contractInstance);
            
        } catch (error) {
            console.error('Failed to fetch contract instance:', error);
        }
    };

    async function fetchEscrowDetails(jobId) {
        try {
            // Make sure jobId is passed as bytes32
            const result = await contractInstance.methods.getFreelancerAddress(jobId).call();
            
            // Log results to the console
            console.log("Escrow Details:");
            console.log("Client Address:", result.clientAddress);
            console.log("Freelancer Address:", result.freelancerAddress);
            console.log("Current Amount:", web3.utils.fromWei(result.currentAmount, 'ether'), "ETH");
            console.log("Current State:", result.currentState); // You can map state number to state description
            console.log("Arbitrator Address:", result.currentArbitrator);
        } catch (error) {
            console.error("Error fetching escrow details:", error);
        }
    }

    async function payDeveloper(jobId) {
        try {
            // Make sure jobId is passed as bytes32

            const accounts = await web3.eth.getAccounts();

            const result = await contractInstance.methods.payDeveloper(jobId).send({ from: accounts[0] });
            console.log("Payment successful:", result);
        } catch (error) {
            console.error("Error paying developer:", error);
        }
    }

    // Function to render actions based on the project status and user type
    const renderActionsBasedOnStatus = () => {
        if (user._id === developer._id) {
            // Developer-specific actions based on the project status
            switch (project.status) {
                case 'Requested':
                    return (
                        <div>
                            <h4>Project Request</h4>
                            <p>You have received a project request. Would you like to approve or reject it?</p>
                            <button className="btn btn-success me-2" onClick={handleDeveloperApproveRequest}>Approve Request</button>
                            <button className="btn btn-danger" onClick={handleDeveloperRejectRequest}>Reject Request</button>
                        </div>
                    );
                case 'Request Approved':
                    return <div>
                        <h4>Submit Your Work</h4>

                        <div className="card bg-light text-muted p-2">
                            Please include the client as a collaborator on your GitHub repository to establish them as a dependent on the project. For better security, please ensure that the repository is private.
                        </div>

                        <div className="mb-3 mt-4">
                            <label htmlFor="githubRepo" className="form-label">GitHub Repository</label>
                            <input
                                type="text"
                                id="githubRepo"
                                className="form-control"
                                placeholder="Enter GitHub Repo URL"
                                value={githubRepo}
                                onChange={(e) => setGithubRepo(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleWorkSubmit}>Submit Work</button>
                    </div>
                case 'Work Rejected':
                    return (
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4>Resubmit Your Work</h4>
                                <div className="card card-info">
                                    Please include the client as a collaborator on your GitHub repository to establish them as a dependent on the project. For better security, please ensure that the repository is private.
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="githubRepo" className="form-label">GitHub Repository</label>
                                    <input
                                        type="text"
                                        id="githubRepo"
                                        className="form-control"
                                        placeholder="Enter GitHub Repo URL"
                                        value={githubRepo}
                                        onChange={(e) => setGithubRepo(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-warning" onClick={handleWorkSubmit}>Resubmit Work</button>
                            </div>
                        </div>
                    );
                case 'Request Rejected':
                    return <p>You have rejected this project request.</p>;
                case 'Work Submitted':
                    return <div>
                        <h4>Work Submitted</h4>

                        <p>Your work has been submitted. Waiting for client approval.</p>

                        <p>View GitHub Repository: </p><a href={project.repo} target="_blank" rel="noreferrer">{project.repo}</a>
                    </div>
                case 'Completed':
                    return <div>
                        <div className="card bg-light text-muted p-2 mt-3 mb-3">
                            Check your wallet for the payment. The funds have been released to you.
                        </div>

                        <div className="card bg-light text-muted p-2 mb-3">
                            View the project on GitHub.

                            <div className="mb-2 mt-2">
                                <a href={project.repo} target="_blank" rel="noreferrer">{project.repo}</a>
                            </div>
                        </div>

                        

                        <h5>This project is completed. You can no longer submit work.</h5>;
                    </div>
                default:
                    return null;
            }
        }

        if (user._id === client._id) {
            // Client-specific actions based on the project status
            switch (project.status) {
                case 'Requested':
                    return <p><b>Your project request has been sent to the developer. Awaiting approval.</b></p>;
                case 'Request Approved':
                    return <p><b>The developer has approved the project request. The project is now in progress.</b></p>;
                case 'Request Rejected':
                    return <p><b>The developer has rejected the project request. You can submit a new request.</b></p>;
                case 'Work Submitted':
                    return (
                        <div>
                            <h4>Review Submitted Work</h4>

                            <div className="mb-4">
                                <label htmlFor="githubRepo" className="form-label">GitHub Repository</label>
                                <div className="card bg-light text-muted p-2">
                                    View the developer's work on their GitHub repository.

                                    <div className="mb-2 mt-2">
                                        <a href={project.repo} target="_blank" rel="noreferrer">{project.repo}</a>
                                    </div>
                                </div>


                            </div>


                            <button className="btn btn-success me-2" onClick={handleClientApprove}>Approve Work</button>
                            <button className="btn btn-danger" onClick={handleClientReject}>Reject Work</button>
                        </div>
                    );
                case 'Work Approved':
                    return <p>You have approved the work. The project is now completed.</p>;
                case 'Work Rejected':
                    return <p>You have rejected the work. Waiting for the developer to resubmit.</p>;
                case 'Completed':
                    return <div>
                        <div className="card bg-light text-muted p-2">
                            View the project on GitHub.

                            <div className="mb-2 mt-2">
                                <a href={project.repo} target="_blank" rel="noreferrer">{project.repo}</a>
                            </div>
                        </div>

                        <h5 className="pt-3 text-muted">This project is completed.</h5>
                    </div>
                default:
                    return null;
            }
        }

        return null;
    };

    return (
        <div className="project-dashboard">
            <AppBar />
            <div className="container mt-4">
                <div className="row">
                    {/* Client Section */}
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Client Information</h4>
                                <p><strong>Name:</strong> {client.name || 'Loading...'}</p>
                                <p><strong>Email:</strong> {client.email || 'Loading...'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Developer Section */}
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Developer Information</h4>
                                <p><strong>Name:</strong> {developer.name || 'Loading...'}</p>
                                <p><strong>Email:</strong> {developer.email || 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Section */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Project Details</h4>
                                <p><strong>Description:</strong> {project.description || 'Loading...'}</p>
                                <p><strong>Delivery Date:</strong> {project.deliveryDate || 'Loading...'}</p>
                                <p><strong>Price:</strong> {project.price || 'Loading...'} ETH</p>
                                <p><strong>Status:</strong> {project.status || 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status-Based Actions */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                {renderActionsBasedOnStatus()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
