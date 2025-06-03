import jwt from 'jsonwebtoken';

import 'dotenv/config';

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { valid: true, decoded };
  } catch {
    return { valid: false, decoded: null };
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return { valid: true, decoded };
  } catch {
    return { valid: false, decoded: null };
  }
};

function generateEmailVerificationToken(payload) {
  return jwt.sign(payload, process.env.EMAIL_VERIFICATION_SECRET, {
    expiresIn: '1d',
  });
}

const verifyEmailVerificationToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    return { valid: true, decoded };
  } catch {
    return { valid: false, decoded: null };
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
};
