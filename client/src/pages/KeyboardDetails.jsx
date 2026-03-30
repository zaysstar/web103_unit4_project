import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import KeyboardsAPI from '../services/KeyboardsAPI';

const KeyboardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [keyboard, setKeyboard] = useState(null);

    // Fetch the specific keyboard when the page loads
    useEffect(() => {
        const fetchKeyboard = async () => {
            try {
                const data = await KeyboardsAPI.getKeyboardById(id);
                setKeyboard(data);
            } catch (error) {
                console.error("Error fetching keyboard details:", error);
            }
        };
        fetchKeyboard();
    }, [id]);

    // Handle the delete button
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this build?");
        if (confirmDelete) {
            try {
                await KeyboardsAPI.deleteKeyboard(id);
                alert("Build deleted successfully!");
                navigate('/customkeyboards'); // Send them back to the gallery
            } catch (error) {
                console.error("Error deleting keyboard:", error);
            }
        }
    };

    if (!keyboard) return <div>Loading...</div>;

    return (
        <div className="details-container">
            <h2>{keyboard.title}</h2>
            <div className="details-card">
                <p><strong>Case Color:</strong> {keyboard.case_color}</p>
                <p><strong>Switch Type:</strong> {keyboard.switch_type}</p>
                <p><strong>Keycap Theme:</strong> {keyboard.keycap_theme}</p>
                <h3>Total Price: ${keyboard.total_price}</h3>
                
                <div className="action-buttons">
                    <Link to={`/edit/${keyboard.id}`} role="button" className="edit-btn">
                        Edit Build
                    </Link>
                    <button onClick={handleDelete} className="delete-btn">
                        Delete Build
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KeyboardDetails;