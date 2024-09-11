import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();

    // If the user is not authenticated, redirect to the login page
    return token ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
