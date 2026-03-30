import { pool } from '../config/database.js'

// GET ALL KEYBOARDS
const getKeyboards = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM custom_keyboards ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// GET A SINGLE KEYBOARD BY ID
const getKeyboard = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM custom_keyboards WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        // 👉 ADD THIS LINE to see the actual database error in your terminal
        console.error("🔴 DATABASE ERROR:", error); 
        res.status(409).json({ error: error.message })
    }
}

// CREATE A NEW KEYBOARD
const createKeyboard = async (req, res) => {
    try {
        const { title, case_color, switch_type, keycap_theme, total_price } = req.body
        const results = await pool.query(
            `INSERT INTO custom_keyboards (title, case_color, switch_type, keycap_theme, total_price)
             VALUES($1, $2, $3, $4, $5) 
             RETURNING *`,
            [title, case_color, switch_type, keycap_theme, total_price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        // 👉 ADD THIS LINE to see the actual database error in your terminal
        console.error("🔴 DATABASE ERROR:", error); 
        res.status(409).json({ error: error.message })
    }
}

// UPDATE A KEYBOARD
const updateKeyboard = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { title, case_color, switch_type, keycap_theme, total_price } = req.body
        const results = await pool.query(
            `UPDATE custom_keyboards 
             SET title = $1, case_color = $2, switch_type = $3, keycap_theme = $4, total_price = $5 
             WHERE id = $6 RETURNING *`,
            [title, case_color, switch_type, keycap_theme, total_price, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// DELETE A KEYBOARD
const deleteKeyboard = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM custom_keyboards WHERE id = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getKeyboards,
    getKeyboard,
    createKeyboard,
    updateKeyboard,
    deleteKeyboard
}