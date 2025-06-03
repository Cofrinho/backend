import AuthRepository from '../../domain/repositories/AuthRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { checkPasswordHash } from '../../shared/utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyEmailVerificationToken,
} from '../../shared/utils/jwt.js';
import { MeDTO } from '../dtos/MeDTO.js';

export default class AuthService {
  static async login(loginDTO) {
    const user = await UserRepository.findByEmail(loginDTO.email);

    if (!user) {
      throw new AppError('Email not found.', 400);
    }

    const passwordMatch = await checkPasswordHash(
      loginDTO.password,
      user.password_hash,
    );

    if (!passwordMatch) {
      throw new AppError('Invalid password.', 400);
    }

    const jwtUserPaylod = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(jwtUserPaylod);
    const refreshToken = generateRefreshToken(jwtUserPaylod);

    await AuthRepository.login(user.id);

    return { accessToken, refreshToken };
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AppError('Refresh token not provided.', 401);
    }

    const { valid, decoded } = verifyRefreshToken(refreshToken);

    if (!valid) {
      throw new AppError('Invalid or expired refresh token.', 401);
    }

    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    return { accessToken };
  }
  static async getMe(userId) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return new MeDTO(user);
  }
  static async verifyEmail(token) {
    if (!token) {
      throw new AppError('Refresh token not provided.', 401);
    }

    const { valid, decoded } = verifyEmailVerificationToken(token);

    if (!valid) {
      throw new AppError('Invalid or expired email verification token.', 401);
    }

    const user = await UserRepository.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.email_verified_at) {
      throw new AppError('Email already verified.', 400);
    }

    return await UserRepository.verifyEmail(user.id);
  }
}
