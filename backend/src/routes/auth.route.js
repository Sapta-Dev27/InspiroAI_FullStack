import express from 'express';
import { registerUser } from '../controllers/register.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { updateUserName, updateEmail, updateUserPassword } from '../controllers/authUpdate.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginController);
router.patch('/updateUsername', authMiddleware, updateUserName)
router.patch('/updateEmail', authMiddleware, updateEmail)
router.patch('/updatePassword', authMiddleware, updateUserPassword)

export default router;






