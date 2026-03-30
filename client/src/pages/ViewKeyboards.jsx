import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KeyboardsAPI from '../services/KeyboardsAPI';

const ViewKeyboards = () => {
    // State to hold the array of keyboards from the database
    const [keyboards, setKeyboards] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchKeyboards = async () => {
            try {
                const data = await KeyboardsAPI.getAllKeyboards();
                setKeyboards(data);
            } catch (error) {
                console.error("Error fetching keyboards:", error);
            }
        };
        fetchKeyboards();
    }, []);

    return (
        <div className="gallery-container">
            <h2>Community Builds</h2>
            
            <div className="keyboard-grid">
                {keyboards && keyboards.length > 0 ? (
                    keyboards.map((kb) => (
                        <div key={kb.id} className="card">
                            <h3>{kb.title}</h3>
                            <p><strong>Case:</strong> {kb.case_color}</p>
                            <p><strong>Switches:</strong> {kb.switch_type}</p>
                            <p><strong>Keycaps:</strong> {kb.keycap_theme}</p>
                            <p><strong>Price:</strong> ${kb.total_price}</p>
                            
                            {/* Link to the details/edit page */}
                            <Link to={`/customkeyboards/${kb.id}`} role="button">
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No custom keyboards found. Be the first to design one!</p>
                )}
            </div>
        </div>
    );
};

export default ViewKeyboards;