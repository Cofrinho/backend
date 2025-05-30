import UserService from '../../application/services/UserService.js';
import { CreateUserDTO } from '../../application/dtos/CreateUserDTO.js';
import { UpdateUserDTO } from '../../application/dtos/UpdateUserDTO.js';
import {
  createUserSchema,
  updateUserSchema,
} from '../validations/userValidator.js';
import { ZodError } from 'zod';

export default class UserController {
  static async create(req, res) {
    const createUserData = req.body;

    try {
      const validatedData = createUserSchema.parse(createUserData);

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

  static async getAll(req, res) {
    try {
      const message = await UserService.getAll();

      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const message = await UserService.getById(req.params.id);

      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updateUserData = {
        id: Number(req.params.id),
        ...req.body,
      };

      const validatedData = updateUserSchema.parse(updateUserData);

      const updateUserDTO = new UpdateUserDTO(validatedData);

      const message = await UserService.update(updateUserDTO);

      return res.status(200).json(message);
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

  static async delete(req, res) {
    try {
      const message = await UserService.delete(req.params.id);

      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
