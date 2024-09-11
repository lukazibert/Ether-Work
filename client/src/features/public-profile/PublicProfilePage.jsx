import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../../components/AppBar';

export default function ProfilePage() {
    const { token } = useAuth(); // Fetch authenticated user token from the context
    const { id: userId } = useParams(); // Get the user ID from the route parameters
    const [user, setUser] = useState(null); // State to store the user profile
    const [projects, setProjects] = useState([]); // State to store the user's projects
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigate = useNavigate(); // Get the navigate function from the router

    // Fetch the profile data from the API when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5111/users/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('User data:', response);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user profile');
                setLoading(false);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:5111/projects/user/${userId}`);
                console.log('Projects:', response);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        if (userId && token) {
            fetchUserProfile();
            fetchProjects();
        }
    }, [userId, token]); // Add userId and token as dependencies

    return (
        <div>
            <AppBar />

            {/* User Info */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex flex-row w-100 justify-content-around mt-3">
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={user?.imgUrl ?? 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid'}
                            alt="User Profile"
                            className=""
                            height={200}
                            width={200}
                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start justify-content-center">
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Name:</label>
                            <div className="h1">{user?.name}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Username:</label>
                            <div className="h5">{user?.username}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Email:</label>
                            <div className="h5">{user?.email}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Role:</label>
                            <div className="h5">{user?.role}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Service Type:</label>
                            <div className="h5">{user?.serviceType ?? 'Not selected'}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <div className="h5 text-secondary">Short Description:</div>
                            <div className="h5">{user?.shortDescription ?? 'No description'}</div>
                        </div>

                        {/* Hire Button */}
                        <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-2 mb-2">
                            <button className="btn btn-primary" onClick={
                                () => navigate(`/project-request/${userId}`)
                            }>Hire {user?.name}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">
                    <div className="h1">Description</div>
                    <div className="h5 mt-3 text-start">{user?.description ?? 'No description set'}</div>

                </div>
            </div>

            {/* Skills */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">
                    <div className="h1">Skills</div>
                    <div className="d-flex flex-row flex-wrap justify-content-between w-100 mt-3">
                        {user?.skills && user?.skills.map((skill, index) => (
                            <div className="btn btn-outline-primary m-1" style={{ cursor: 'default' }} key={index}>{skill}</div>
                        ))}

                        {user?.skills?.length === 0 && <div className="h5">No skills found</div>}
                    </div>
                </div>
            </div>

            {/* Projects */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">
                    <div className="h1">Projects ({projects.length})</div>
                    <div className="row w-100 mt-3">
                        {projects && projects.map((project) => (
                            <div className="col-12 col-md-6 mb-4" key={project.id}>
                                <div className="card w-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{project.client}</h5>
                                        <p className="card-text">{project.description}</p>
                                        <div className="card-text text-secondary p-3">{project.deliveryDate}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && <div className="h5 text-start">No projects found</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
