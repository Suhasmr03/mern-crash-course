import { verifyAccess } from '../lib/utils.js';
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: 'Not authorized, no token provided' });

    const decoded = verifyAccess(token);
    if (!decoded?.userId) return res.status(401).json({ message: 'Invalid token payload' });

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
