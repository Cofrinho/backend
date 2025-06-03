import AuthService from '../../application/services/AuthService.js';
import UserService from '../../application/services/UserService.js';
import { LoginDTO } from '../../application/dtos/LoginDTO.js';
import { loginSchema } from '../validations/userValidator.js';

import { createUserSchema } from '../validations/userValidator.js';
import { CreateUserDTO } from '../../application/dtos/CreateUserDTO.js';

import { ZodError } from 'zod';

export default class AuthController {
  static async login(req, res) {
    const loginData = req.body;

    try {
      const validatedData = loginSchema.parse(loginData);

      const loginDTO = new LoginDTO(validatedData);

      const tokens = await AuthService.login(loginDTO);

      return res.status(200).json(tokens);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors
          .map((err) => err.message)
          .join(', ');
        return res.status(400).json({ error: formattedErrors });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async register(req, res) {
    const registerData = req.body;

    try {
      const validatedData = createUserSchema.parse(registerData);

      const createUserDTO = new CreateUserDTO(validatedData);

      const message = await UserService.create(createUserDTO);

      return res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors
          .map((err) => err.message)
          .join(', ');
        return res.status(400).json({ error: formattedErrors });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async refresh(req, res) {
    const { refreshToken } = req.body;

    try {
      const accessToken = await AuthService.refresh(refreshToken);

      return res.status(200).json(accessToken);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async getMe(req, res) {
    try {
      const userId = req.user.id;

      const userData = await AuthService.getMe(userId);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async verifyEmail(req, res) {
    const { token } = req.query;

    try {
      await AuthService.verifyEmail(token);

      return res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
