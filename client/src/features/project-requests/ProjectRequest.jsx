import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import arbitrator from '../../contracts/Arbitrator.json';

const ProjectRequest = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        deliveryDate: '',
    });
    const [developer, setDeveloper] = useState('');
    const [contractInstance, setContractInstance] = useState(null);

    const { user } = useAuth();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const web3 = new Web3(window.ethereum);


    const { id: userId } = useParams();

    useEffect(() => {
        const id = userId;

        console.log('User ID:', id);

        console.log('User ID from URL:', userId);



        if (id) {
            console.log('User ID from URL:', id);
            fetchDeveloperData(id);
            fetchArbitratorContractInstance();
        }
    }, [searchParams, userId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                console.error("No account found");
                return;
            }

            if (!contractInstance) {
                console.error("Contract instance not found");
                return;
            }

            if (!formData.price) {
                console.error("Price is required");
                return;
            }

            const projectData = {
                ...formData,
                developerId: developer.id,
                clientId: user._id, // Get the client ID from the logged-in user
            };

            // Create the project in the backend
            const project = await createProject(projectData);
            console.log('Project created:', project);

            // Generate jobId based on project._id
            const priceInWei = web3.utils.toWei(formData.price, "ether");

            console.log('COntract methods:', contractInstance.methods);

            const contractAbi = contractInstance.options.jsonInterface;

            const methodExists = contractAbi.some(item => item.name === 'createJobContract');

            if (methodExists) {
                console.log("Method 'createJobContract' exists in the ABI.");
            } else {
                console.error("Method 'createJobContract' does not exist in the ABI.");
            }


            const gasEstimate = await contractInstance.methods
                .createJobContract(project.jobId, priceInWei)
                .estimateGas({ from: accounts[0], value: priceInWei });

            console.log('Gas estimate:', gasEstimate);

            console.log('_methods', contractInstance._methods);

            console.log('methods', contractInstance.methods);

            console.log('methods.createJobContract', contractInstance.methods.createJobContract);
            


            // Create the job contract on the blockchain
            const result = await contractInstance.methods
                .createJobContract(project.jobId, priceInWei)
                .send({
                    from: accounts[0],
                    value: priceInWei,
                    gas: gasEstimate,
                    gasPrice: web3.utils.toWei('20', 'gwei')
                });

            const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
            if (receipt.status) {
                console.log('Payment successful:', result);
            } else {
                console.error('Transaction failed.');
            }


            // Navigate to the project page
            navigate(`/project/${project._id}`);

        } catch (error) {
            if (error.response) {
                // Handle HTTP errors
                console.error('Error creating project or setting job ID:', error.response.data);
            } else {
                // Handle blockchain or general errors
                console.error('Error:', error.message || error);
            }
        }
    };

    const createProject = async (projectData) => {
        try {
            const response = await axios.post('http://localhost:5111/projects/', projectData);
            console.log('Project created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error.response ? error.response.data : error.message);
            throw error;
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

            // print out the createJobContract api definition from the response
            

            setContractInstance(contract);

            console.log('Contract instance:', contract.methods.createJobContract);
            


            console.log('createJobContract:', contract.options.jsonInterface.find(item => item.name === 'createJobContract'));

        } catch (error) {
            console.error('Failed to fetch contract instance:', error);
        }
    };
    

    const fetchDeveloperData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5111/users/project-request/${id}`);
            const data = await response.data;
            setDeveloper(data);
        } catch (error) {
            console.error('Failed to fetch developer:', error);
        }
    };

    return (
        <div className="project-request">
            <AppBar />
            <div className="container p-3">
                <div className="card p-3">
                    <h1>Send a project request to</h1>
                    <div className="d-flex gap-4 align-items-center justify-content-center">
                        <h2>{developer.name}</h2>
                        <img
                            src={developer.profileImg}
                            alt={developer.name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="w-100">
                        <div className="form-group w-100 mb-3 text-start">
                            <label htmlFor="name">Project Name</label>
                            <input
                                type="text"
                                className="form-control w-100"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group w-100 mb-3 text-start">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control w-100"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group w-100 mb-3 text-start">
                            <label htmlFor="shortDescription">Short Description</label>
                            <input
                                type="text"
                                className="form-control w-100"
                                id="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group w-100 mb-3 text-start">
                            <label htmlFor="price">Price (ETH)</label>
                            <input
                                type="number"
                                className="form-control w-100"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group w-100 mb-3 text-start">
                            <label htmlFor="deliveryDate">Delivery Date</label>
                            <input
                                type="date"
                                className="form-control w-100"
                                id="deliveryDate"
                                value={formData.deliveryDate}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectRequest;
