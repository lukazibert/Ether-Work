import axios from 'axios';

const API_URL = 'http://localhost:5111/auth';

// Register a new user
export const register = async (username, name, email, password, isDeveloper) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, name, email, password, isDeveloper });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Registration failed';
    }
};

// Login a user
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const { token } = response.data;

        // Save the JWT to localStorage
        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Login failed';
    }
};

// Logout a user
export const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
};

// Get the current user token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Example function to access a protected route
export const getProtectedData = async () => {
    try {
        const token = getToken();
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${API_URL}/protected`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Access denied';
    }
};
