import express from 'express'
import { login, logout, signup, verifyEmail, forgetPassword, resetPassword, checkAuth } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth)

router.post('/signup', signup )

router.post('/login', login)

router.post('/logout', logout)

router.post('/verify-email', verifyEmail )

router.post('/forget-password', forgetPassword )

router.post('/reset-password/:token', resetPassword )

export default router