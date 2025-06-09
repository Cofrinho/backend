import GroupService from '../../application/services/GroupService.js';
import CreateGroupDTO from '../../application/dtos/CreateGroupDTO.js';
import UpdateGroupDTO from '../../application/dtos/UpdateGroupDTO.js';
import {
  createGroupSchema,
  updateGroupSchema,
} from '../validations/groupValidator.js';
import { ZodError } from 'zod';

export default class GroupController {
  static async create(req, res) {
    const createGroupData = req.body;

    try {
      const validatedData = createGroupSchema.parse(createGroupData);
      const createGroupDTO = new CreateGroupDTO(validatedData);
      const result = await GroupService.create(createGroupDTO);
      return res.status(201).json(result);
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
      const groups = await GroupService.getAll();
      return res.status(200).json(groups);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const group = await GroupService.getById(req.params.id);
      return res.status(200).json(group);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getByUserId(req, res) {
    try {
      const groups = await GroupService.getByUserId(req.params.userId);
      return res.status(200).json(groups);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getByAccessCode(req, res) {
    try {
      const group = await GroupService.getByAccessCode(req.params.accessCode);
      return res.status(200).json(group);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updateGroupData = {
        id: Number(req.params.id),
        ...req.body,
      };
      const validatedData = updateGroupSchema.parse(updateGroupData);
      const updateGroupDTO = new UpdateGroupDTO(validatedData);
      const result = await GroupService.update(updateGroupDTO);
      return res.status(200).json(result);
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
      const message = await GroupService.delete(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
