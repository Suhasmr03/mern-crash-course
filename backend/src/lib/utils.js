import jwt from 'jsonwebtoken';

const isProd = process.env.NODE_ENV === 'production';

export const generateTokens = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

  // Access token cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000,
  });

  // Refresh token cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

export const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
};

export const verifyAccess = (token) => jwt.verify(token, process.env.JWT_SECRET);
export const verifyRefresh = (token) => jwt.verify(token, process.env.REFRESH_SECRET);
