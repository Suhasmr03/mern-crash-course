import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateTokens, clearAuthCookies, verifyRefresh } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const newUser = await User.create({ email, fullName, password });

    const { accessToken, refreshToken } = generateTokens(newUser._id, res);
    newUser.refreshToken = refreshToken;
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      profilePicture: newUser.profilePicture,
      accessToken, // optional; cookie is primary
    });
  } catch (error) {
    console.log('error in signup controller:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(401).json({ message: 'Invalid email or password.' });

    const { accessToken, refreshToken } = generateTokens(user._id, res);
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      accessToken, // optional
    });
  } catch (error) {
    console.log('error in login controller:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token provided' });

    const payload = verifyRefresh(token);
    if (!payload?.userId) return res.status(401).json({ message: 'Invalid refresh token payload' });

    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Refresh token invalid or rotated' });
    }

    const { accessToken, refreshToken: newRefresh } = generateTokens(user._id, res);

    // rotate refresh token
    user.refreshToken = newRefresh;
    await user.save();

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh token expired' });
    }
    console.log('error in refreshToken controller:', error.message);
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req, res) => {
  try {
    if (req.userId) {
      await User.findByIdAndUpdate(req.userId, { refreshToken: null });
    }
    clearAuthCookies(res);
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.log('error in logout controller:', error.message);
    return res.status(500).json({ message: 'Internal Server error. Please try again later.' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.userId || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized.' });
    if (!profilePicture) return res.status(400).json({ message: 'Profile picture URL is required.' });

    const upload = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: upload.secure_url },
      { new: true }
    ).select('-password');

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log('error in updateProfile controller:', error.message);
    return res.status(500).json({ message: 'Internal Server error. Please try again later.' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized.' });
    const user = await User.findById(req.userId).select('_id email fullName profilePicture createdAt');
    return res.status(200).json({ user });
  } catch (error) {
    console.log('error in checkAuth controller:', error.message);
    return res.status(500).json({ message: 'Internal Server error. Please try again later.' });
  }
};
