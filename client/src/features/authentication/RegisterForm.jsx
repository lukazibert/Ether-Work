import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        isDeveloper: false,
    });

    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target; // Destructure the necessary properties
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value, // Use checked for checkboxes, value for others
        }));
    };
    

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await registerUser(formData.username, formData.name, formData.email, formData.password, formData.isDeveloper);
            navigate('/home'); // Redirect after registration
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card" style={{ width: '30rem', fontFamily: 'Futura' }}>
            <div className="card-header h4">Register</div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="d-flex flex-column align-items-start gap-3 mb-4">
                        <label className="h5" htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />

                        <label className="h5" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <label className="h5" htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        <label className="h5" htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />

                        {/* Developer checkbox */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="isDeveloper"
                                name="isDeveloper"
                                value={formData.isDeveloper}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="isDeveloper">
                                Developer
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary d-flex w-100 justify-content-center"
                        style={{
                            backgroundColor: '#7749F8',
                        }}
                    >
                        Register
                    </button>
                    <div
                        className="btn btn-link"
                        style={{
                            color: '#7749F8',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/auth/login')}
                    >
                        Already have an account? Login
                    </div>
                </form>
            </div>
        </div >
    );
}
