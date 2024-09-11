import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeveloperCard({ user }) {

    const navigate = useNavigate();

    return (
        <div className="card" 
            style={{
                width: "100%", // Full width for a wide layout
                height: 'auto',
                borderRadius: '15px',
                display: 'flex', // Set flex to create a horizontal layout
                flexDirection: 'row', // Make it a row layout
                alignItems: 'flex-start',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a slight shadow for a more modern look
            }}
            onClick={() => navigate(`/view-profile/${user.id}`)} // Add onClick to redirect to user page
        >
            {/* Image section */}
            <img src={user.imageUrl ?? 'https://placehold.co/600x400'} alt="User Image" 
                height={200} 
                width={250} // Set a width for the image to give a horizontal feel
                style={{ 
                    borderRadius: '15px 0px 0px 15px', 
                    objectFit: 'cover' 
                }} 
            />

            {/* Card Body */}
            <div className="card-body d-flex flex-column justify-content-between" style={{ flex: 1, padding: '20px' }}>
                
                {/* Top Section: User Info */}
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="card-title h3"
                        style={{ fontFamily: 'Futura', cursor: 'pointer' }}
                        onClick={() => { /* Add onClick logic to redirect to user page */ }}
                    >
                        {user.name} ({user.username})
                    </div>
                </div>

                {/* Short Description Section */}
                <div className="d-flex pt-2 text-secondary" style={{ fontFamily: 'Futura', fontSize: '16px' }}>
                    {user.shortDescription || "No short description available"}
                </div>

                {/* Skills Section */}
                <div className="d-flex flex-wrap gap-1 mt-2">
                    {user.skills && user.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
                            <span className="badge rounded-pill bg-secondary text-white" key={index}>
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-secondary">No skills available</span>
                    )}
                </div>

                {/* Contact Section */}
                <div className="d-flex flex-row gap-2 pt-2">
                    <div className="text-primary" style={{ fontFamily: "Futura", fontSize: "16px" }}>
                        Contact: 
                    </div>
                    <div className="text-secondary" style={{ fontFamily: "Futura", fontSize: "16px" }}>
                        {user.email}
                    </div>
                </div>
            </div>
        </div>
    );
}
