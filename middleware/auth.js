import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    res.status(401).json({
      status: "error",
      msg: 'No token provided, authorization denied',
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      status: "error",
      msg: 'Token is not valid',
    });
  }
};