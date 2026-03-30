import express from 'express'
import KeyboardsController from '../controllers/keyboards.js'

const router = express.Router()

// Map the HTTP requests to the controller functions
router.get('/', KeyboardsController.getKeyboards)
router.get('/:id', KeyboardsController.getKeyboard)
router.post('/', KeyboardsController.createKeyboard)
router.patch('/:id', KeyboardsController.updateKeyboard)
router.delete('/:id', KeyboardsController.deleteKeyboard)

export default router