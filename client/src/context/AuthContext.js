import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, login, logout, register } from '../services/authentication';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const rehydrateAuth = async () => {
            const storedToken = getToken(); // Retrieve token from localStorage

            console.log('Stored token:', storedToken);
            

            if (storedToken) {
                try {
                    // Set token in state
                    setToken(storedToken);

                    // Fetch the user data using the token
                    const response = await axios.get('http://localhost:5111/auth/user/', {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });

                    console.log('User data:', response.data);
                    

                    setUser(response.data.user); // Set user data in state
                } catch (error) {
                    console.error('Failed to rehydrate user:', error);
                    logoutUser(); // Clear token and user data if fetch fails
                }
            }
            setLoading(false); // Set loading to false after the check
        };

        rehydrateAuth(); // Call the rehydration function on mount
    }, [token]);

    const loginUser = async (email, password) => {
        const userData = await login(email, password);
        setToken(userData.token);
        setUser(userData.user);
        // Store the token in localStorage for persistence
        localStorage.setItem('token', userData.token);
    };

    const registerUser = async (username, name, email, password, isDeveloper) => {
        await register(username, name, email, password, isDeveloper);
        await loginUser(email, password);
    };

    const logoutUser = () => {
        logout();
        setToken(null);
        setUser(null);
        // Remove the token from localStorage
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, loginUser, registerUser, logoutUser }}>
            {!loading && children} {/* Render children only when not loading */}
        </AuthContext.Provider>
    );
};
