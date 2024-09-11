import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is used to make HTTP requests
import DeveloperCard from './DeveloperCard'; // Import the ServiceCard component
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import AppBar from '../../components/AppBar'; // Import the AppBar component

export default function ExplorePage() {
    // State to store search query and list of users
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { token } = useAuth();

    // Function to fetch users based on the search query
    const fetchUsers = async (searchQuery) => {
        console.log('Fetching users:', searchQuery);
        
        try {
            setLoading(true); // Set loading state
            const response = await axios.get(`http://localhost:5111/users?search=${searchQuery}`,
                { headers: { Authorization: `Bearer ${token}` } }
            ); // Assuming backend endpoint to query users
            setUsers(response.data);
            setLoading(false);

            console.log('Users:', response.data);

        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        console.log(e.target.value);
        
        setQuery(e.target.value);
    };

    // Fetch users when query changes (debounce optional)
    useEffect(() => {
        if (query) {
            fetchUsers(query);
        } else {
            fetchUsers(''); // Fetch all users if query is empty
        }
    }, [token]);

    return (
        <div>
            <AppBar />
            <div className="container mt-4">
                {/* Search Bar */}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for developers..."
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary ms-2" type="button" onClick={() => fetchUsers(query)}>
                            Search
                        </button>
                    </div>
                </div>

                {/* Loading Indicator */}
                {loading && <div>Loading...</div>}

                {/* Service Cards */}
                <div className="column">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div className="mb-4" key={user.id}>
                                {/* Render the ServiceCard for each user */}
                                <DeveloperCard
                                    user={user}
                                />
                            </div>
                        ))
                    ) : (
                        !loading && <div>No services found.</div>
                    )}
                </div>
            </div>

        </div>
    );
}
