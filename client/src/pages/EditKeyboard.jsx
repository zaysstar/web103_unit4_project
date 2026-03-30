import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KeyboardsAPI from '../services/KeyboardsAPI';
import { calculateTotalPrice } from '../utilities/calcPrice';

const EditKeyboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [keyboard, setKeyboard] = useState({
        title: '', case_color: '', switch_type: '', keycap_theme: '', total_price: 0
    });

    // 1. Fetch existing data to pre-fill the form
    useEffect(() => {
        const fetchKeyboard = async () => {
            const data = await KeyboardsAPI.getKeyboardById(id);
            setKeyboard(data);
        };
        fetchKeyboard();
    }, [id]);

    // 2. Recalculate price if they change their mind on options
    useEffect(() => {
        const newPrice = calculateTotalPrice(keyboard.case_color, keyboard.switch_type, keyboard.keycap_theme);
        setKeyboard(prev => ({ ...prev, total_price: newPrice }));
    }, [keyboard.case_color, keyboard.switch_type, keyboard.keycap_theme]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setKeyboard(prev => ({ ...prev, [name]: value }));
    };

    // 3. Submit the UPDATE to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await KeyboardsAPI.updateKeyboard(id, keyboard);
            alert("Build updated successfully!");
            navigate(`/customkeyboards/${id}`); // Send them back to see their updated details
        } catch (error) {
            console.error("Error updating keyboard:", error);
        }
    };

    return (
        <div className="create-container">
            <h2>Edit Your Build: {keyboard.title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Build Name: </label>
                    <input type="text" name="title" value={keyboard.title} onChange={handleChange} />
                </div>

                {/* CASE */}
                <div className="form-group">
                    <h3>1. Choose Your Case</h3>
                    <label><input type="radio" name="case_color" value="Obsidian Black" checked={keyboard.case_color === 'Obsidian Black'} onChange={handleChange} /> Obsidian Black (+$50)</label>
                    <label><input type="radio" name="case_color" value="Glacier White" checked={keyboard.case_color === 'Glacier White'} onChange={handleChange} /> Glacier White (+$50)</label>
                    <label><input type="radio" name="case_color" value="Neon Cyberpunk Acrylic" checked={keyboard.case_color === 'Neon Cyberpunk Acrylic'} onChange={handleChange} /> Neon Cyberpunk Acrylic (+$80)</label>
                </div>

                {/* SWITCHES */}
                <div className="form-group">
                    <h3>2. Choose Your Switches</h3>
                    <label><input type="radio" name="switch_type" value="Linear Reds" checked={keyboard.switch_type === 'Linear Reds'} onChange={handleChange} /> Linear Reds (+$30)</label>
                    <label><input type="radio" name="switch_type" value="Tactile Browns" checked={keyboard.switch_type === 'Tactile Browns'} onChange={handleChange} /> Tactile Browns (+$30)</label>
                    <label><input type="radio" name="switch_type" value="Clicky Blues" checked={keyboard.switch_type === 'Clicky Blues'} onChange={handleChange} /> Clicky Blues (+$35)</label>
                </div>

                {/* KEYCAPS */}
                <div className="form-group">
                    <h3>3. Choose Your Keycaps</h3>
                    <label><input type="radio" name="keycap_theme" value="Retro 90s" checked={keyboard.keycap_theme === 'Retro 90s'} onChange={handleChange} /> Retro 90s (+$40)</label>
                    <label><input type="radio" name="keycap_theme" value="Matcha Minimalist" checked={keyboard.keycap_theme === 'Matcha Minimalist'} onChange={handleChange} /> Matcha Minimalist (+$45)</label>
                    <label><input type="radio" name="keycap_theme" value="RGB Pudding" checked={keyboard.keycap_theme === 'RGB Pudding'} onChange={handleChange} /> RGB Pudding (+$50)</label>
                </div>

                <div className="price-display">
                    <h3>Total Price: ${keyboard.total_price}</h3>
                </div>

                <button type="submit">Update Build</button>
            </form>
        </div>
    );
};

export default EditKeyboard;