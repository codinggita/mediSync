import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const secretKey = process.env.JWT_SECRET || 'MediSync_Tactical_Core_982_Secure_Handshake';
  return jwt.sign({ id }, secretKey, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export default generateToken;
