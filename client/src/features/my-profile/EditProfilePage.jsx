import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBarSVG from '../../assets/App bar.svg';

export default function EditProfilePage() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        isDeveloper: false,
        shortDescription: '',
        description: '',
        skills: [''],
        imgUrl: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5111/users/profile/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('User data:', response);

                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user?._id) {
            fetchUserData();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSkillsChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;
        setFormData({
            ...formData,
            skills: updatedSkills,
        });
    };

    const handleAddSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, ''],
        });
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            skills: updatedSkills,
        });
    };

    const handleSubmit = async (e) => {
        try {
            await axios.put(`http://localhost:5111/users/update/${user._id}`, formData);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="">
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
                        onClick={() => navigate('/home')}
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
                <button className="btn btn-light" onClick={() => {
                    handleSubmit();
                }}>Save</button>
            </div>

            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-row w-100 justify-content-around">
                    <div className="d-flex flex-column align-items-center">
                        <img
                            src={'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid'}
                            alt="User Profile"
                            className=""
                            height={200}
                            width={200}
                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-end justify-content-center">
                        <div className="mb-2 d-flex align-items-center gap-2 justify-content-end">
                            <label className="h5 text-secondary">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2 justify-content-end">
                            <label className="h5 text-secondary">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2 justify-content-end">
                            <label className="h5 text-secondary">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 d-flex align-items-center gap-2 justify-content-end">
                            <label className="h5 text-secondary">Short Description</label>
                            
                            <input
                                type="text"
                                className="form-control"
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
                <div className="d-flex flex-column align-items-start justify-content-center w-75">

                    <div className="d-flex flex-column gap-3 align-items-start">
                        <div className="h1">Description</div>

                        <textarea
                            className="form-control text-start"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            cols={150}
                        />

                    </div>


                    <div className='d-flex gap-4 align-items-start mt-3'>
                        <div className="h1">Skills</div> 
                        <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={handleAddSkill}
                        >
                            Add Skill
                        </button>
                    </div>

                    <div className="d-flex flex-row flex-wrap justify-content-start w-100 mt-3">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="d-flex align-items-center mb-2 me-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={skill}
                                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveSkill(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
