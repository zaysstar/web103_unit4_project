const baseURL = '/api/keyboards'

// GET ALL
const getAllKeyboards = async () => {
    const response = await fetch(baseURL)
    const data = await response.json()
    return data
}

// GET ONE BY ID
const getKeyboardById = async (id) => {
    const response = await fetch(`${baseURL}/${id}`)
    const data = await response.json()
    return data
}

// CREATE NEW
const createKeyboard = async (keyboardData) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyboardData)
    })
    const data = await response.json()
    return data
}

// UPDATE EXISTING
const updateKeyboard = async (id, keyboardData) => {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(keyboardData)
    })
    const data = await response.json()
    return data
}

// DELETE
const deleteKeyboard = async (id) => {
    const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}

export default {
    getAllKeyboards,
    getKeyboardById,
    createKeyboard,
    updateKeyboard,
    deleteKeyboard
}