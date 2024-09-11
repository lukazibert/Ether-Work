import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppBarSVG from '../../assets/App bar.svg';
import axios from 'axios';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        email: '',
        isDeveloper: false,
        shortDescription: '',
        description: '',
        skills: [],
        imgUrl: '',
        role: '',
    });

    useEffect(() => {

        console.log('User:', user);


        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:5111/projects/user/${user._id}`);
                console.log('Projects:', response);

                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        console.log('Callig fetchProjects');

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5111/users/profile/${user._id}`);
                console.log('User data:', response);

                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user?._id) {
            fetchProjects();
            fetchUserData();
        }
    }, [user]);

    return (
        <div className="" >
            <div className="appbar" style={{
                width: '100vw',
                height: '5rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: '0',
                left: '0',
                padding: '0 3rem',
            }}>
                <img src={AppBarSVG} alt=""
                    style={{
                        width: '100%',
                        height: '5rem',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '-1',
                    }} />
                <div className="d-flex flex-row align-items-center">
                    <div className="h1 text-light" style={{
                        fontFamily: 'Futura',
                    }}
                        onClick={
                            () => navigate('/home')
                        }
                    >
                        EtherWork
                    </div>
                    <div className="action-row d-flex flex-row ps-5" style={{
                        fontFamily: 'Futura',
                    }}>
                        <div className="btn text-light" onClick={
                            () => navigate('/home')
                        }>
                            Home
                        </div>
                        <div className="btn text-light" onClick={
                            () => navigate('/explore')
                        }>
                            Explore
                        </div>
                        <div className="btn text-light" onClick={() => navigate('/my-projects')}>
                            My Projects
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline-light" onClick={() => {
                    navigate('/profile/edit');
                }}>Edit</button>
            </div>

            <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex flex-row w-100 justify-content-around mt-3">
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={userData?.imgUrl ?? 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid'}
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
                            <div className="h1">{userData?.name}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Username:</label>
                            <div className="h5">{userData?.username}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Email:</label>
                            <div className="h5">{userData?.email}</div>
                        </div>
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Role:</label>
                            <div className="h5">{userData?.role}</div>
                        </div>
                        {/* <div className="mb-2 d-flex gap-2 align-items-center">
                            <label className="h5 text-secondary">Service Type:</label>
                            <div className="h5">{userData?.serviceType ?? 'Not selected'}</div>
                        </div> */}
                        <div className="mb-2 d-flex gap-2 align-items-center">
                            <div className="h5 text-secondary">Short Description:</div>
                            <div className="h5">{userData?.shortDescription ?? 'No description'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-start text-start w-75">
                    <div className="h1">Description</div>
                    <div className="h5 mt-3">{userData?.description ?? 'No description'}</div>
                </div>
            </div>


            {/* Skills */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">
                    <div className="h1">Skills</div>
                    <div className="d-flex flex-row flex-wrap justify-content-between w-100 mt-3">
                        {userData?.skills?.length > 0 ? (
                            userData.skills.map((skill, index) => (
                                <div className="btn btn-outline-primary m-1" key={index}>{skill}</div>
                            ))
                        ) : (
                            <div className="h5">No skills found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Projects */}
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">
                    <div className="h1">Projects ({projects?.length})</div>
                    <div className="row w-100 mt-3">
                        {projects?.length > 0 ? (
                            projects.map((project) => (
                                <div className="col-12 col-md-6 mb-4" key={project.id}>
                                    <div className="card w-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{project.client}</h5>
                                            <p className="card-text">{project.description}</p>
                                            <div className="card-text text-secondary p-3">{project.deliveryDate}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h5 text-start">No projects found</div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
