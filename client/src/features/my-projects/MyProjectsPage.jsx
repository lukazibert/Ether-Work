import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import AppBar from '../../components/AppBar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyProjectsPage = () => {
    const { token, user } = useAuth();
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            if (!token) {
                return;
            }

            const endpoint = user.role === 'developer' 
                ? `http://localhost:5111/projects/developer/${user._id}` 
                : `http://localhost:5111/projects/client/${user._id}`;

            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(response.data);
        };

        fetchProjects();
    }, [token, user._id]);

    // Function to group projects by status
    const groupProjectsByStatus = (projects) => {
        return projects.reduce((groups, project) => {
            const { status } = project;
            if (!groups[status]) {
                groups[status] = [];
            }
            groups[status].push(project);
            return groups;
        }, {});
    };

    const groupedProjects = groupProjectsByStatus(projects);

    return (
        <div>
            <AppBar />
            <Container>
                <h1 className="mt-4">My Projects</h1>

                {/* Check if there are any projects */}
                {projects.length === 0 && (
                    <p>No projects found</p>
                )}

                {/* Loop through the grouped projects by status */}
                {Object.keys(groupedProjects).map((status) => (
                    <div key={status}>
                        <h3 className='d-flex justify-content-start'>{status}</h3>
                        <Row>
                            {groupedProjects[status].map((project) => (
                                <Col md={4} key={project._id} className="mb-4">
                                    <Card className="h-100 shadow" onClick={() => navigate(`/project/${project._id}`)}>
                                        <Card.Body>
                                            <Card.Title>{project.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{project.shortDescription}</Card.Subtitle>
                                            <Card.Text className='d-flex justify-content-start align-text-start gap-2'><strong>Price:</strong> {project.price} ETH</Card.Text>
                                            <Card.Text className='d-flex justify-content-start align-text-start gap-2'><strong>Status:</strong> {project.status}</Card.Text>
                                            <Card.Text className='d-flex justify-content-start align-text-start gap-2'><strong>Delivery Date:</strong> {new Date(project.deliveryDate).toLocaleDateString()}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default MyProjectsPage;
