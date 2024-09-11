import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import AppBar from '../../components/AppBar';

export default function LoginForm() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await loginUser(formData.email, formData.password);
            navigate('/home'); // Redirect after login
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            {/* <AppBar /> */}

            <div className="card" style={{ width: '30rem', fontFamily: 'Futura' }}>
            <div className="card-header h4">Login</div>
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="d-flex flex-column align-items-start gap-3 mb-4">
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
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary d-flex w-100 justify-content-center"
                        style={{
                            backgroundColor: '#7749F8',
                        }}
                    >
                        Login
                    </button>
                    <div
                        className="btn btn-link"
                        style={{
                            color: '#7749F8',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/auth/register')}
                    >
                        New to EtherWork?
                    </div>
                </form>
            </div>
        </div >
        </div>
        
    );
}
