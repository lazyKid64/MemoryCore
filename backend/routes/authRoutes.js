import express from 'express';
const router1 = express.Router();
import { register, login } from '../controllers/authController.js';

router1.post('/register', register);
router1.post('/login', login);

export default router1;