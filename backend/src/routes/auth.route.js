import express from 'express';
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  refreshToken
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected
router.post('/logout', protectRoute, logout);
router.put('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkAuth);

export default router;
