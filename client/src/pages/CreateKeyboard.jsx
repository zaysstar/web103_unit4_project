import React, { useState, useEffect } from 'react';
import KeyboardsAPI from '../services/KeyboardsAPI';
import { calculateTotalPrice } from '../utilities/calcPrice';

const CreateKeyboard = () => {
    // State to hold the user's current selections
    const [keyboard, setKeyboard] = useState({
        title: '',
        case_color: '',
        switch_type: '',
        keycap_theme: '',
        total_price: 0
    });

    // Automatically recalculate the price whenever an option changes
    useEffect(() => {
        const newPrice = calculateTotalPrice(
            keyboard.case_color, 
            keyboard.switch_type, 
            keyboard.keycap_theme
        );
        setKeyboard(prev => ({ ...prev, total_price: newPrice }));
    }, [keyboard.case_color, keyboard.switch_type, keyboard.keycap_theme]);

    // Handle typing in the text input and clicking the radio buttons
    const handleChange = (event) => {
        const { name, value } = event.target;
        setKeyboard(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit the final build to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Basic validation: make sure they picked one of everything
        if (!keyboard.title || !keyboard.case_color || !keyboard.switch_type || !keyboard.keycap_theme) {
            alert("Please complete your build by selecting all options!");
            return;
        }

        try {
            await KeyboardsAPI.createKeyboard(keyboard);
            alert("🎉 Custom Keyboard Created Successfully!");
            window.location.href = "/"; // Send them back to the gallery
        } catch (error) {
            console.error("Error creating keyboard:", error);
        }
    };

    return (
        <div className="create-container">
            <h2>Design Your Custom Keyboard</h2>
            <form onSubmit={handleSubmit}>
                
                {/* TITLE */}
                <div className="form-group">
                    <label>Build Name: </label>
                    <input type="text" name="title" value={keyboard.title} onChange={handleChange} placeholder="e.g., The Midnight Typist" />
                </div>

                {/* CASE COLOR */}
                <div className="form-group">
                    <h3>1. Choose Your Case</h3>
                    <label>
                        <input type="radio" name="case_color" value="Obsidian Black" onChange={handleChange} /> Obsidian Black (+$50)
                    </label>
                    <label>
                        <input type="radio" name="case_color" value="Glacier White" onChange={handleChange} /> Glacier White (+$50)
                    </label>
                    <label>
                        <input type="radio" name="case_color" value="Neon Cyberpunk Acrylic" onChange={handleChange} /> Neon Cyberpunk Acrylic (+$80)
                    </label>
                </div>

                {/* SWITCH TYPE */}
                <div className="form-group">
                    <h3>2. Choose Your Switches</h3>
                    <label>
                        <input type="radio" name="switch_type" value="Linear Reds" onChange={handleChange} /> Linear Reds (+$30)
                    </label>
                    <label>
                        <input type="radio" name="switch_type" value="Tactile Browns" onChange={handleChange} /> Tactile Browns (+$30)
                    </label>
                    <label>
                        <input type="radio" name="switch_type" value="Clicky Blues" onChange={handleChange} /> Clicky Blues (+$35)
                    </label>
                </div>

                {/* KEYCAP THEME */}
                <div className="form-group">
                    <h3>3. Choose Your Keycaps</h3>
                    <label>
                        <input type="radio" name="keycap_theme" value="Retro 90s" onChange={handleChange} /> Retro 90s (+$40)
                    </label>
                    <label>
                        <input type="radio" name="keycap_theme" value="Matcha Minimalist" onChange={handleChange} /> Matcha Minimalist (+$45)
                    </label>
                    <label>
                        <input type="radio" name="keycap_theme" value="RGB Pudding" onChange={handleChange} /> RGB Pudding (+$50)
                    </label>
                </div>

                {/* DYNAMIC PRICE DISPLAY */}
                <div className="price-display">
                    <h3>Total Price: ${keyboard.total_price}</h3>
                </div>

                <button type="submit">Save Build</button>
            </form>
        </div>
    );
};

export default CreateKeyboard;