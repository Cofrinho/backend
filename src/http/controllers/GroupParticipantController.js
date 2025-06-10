import GroupParticipantService from '../../application/services/GroupParticipantService.js';
import GroupParticipantDTO from '../../application/dtos/GroupParticipantDTO.js';
import {
  createGroupParticipantSchema,
  updateGroupParticipantSchema,
  createParticipantByAccessCodeSchema,
} from '../validations/groupParticipantValidator.js';
import { ZodError } from 'zod';

export default class GroupParticipantController {
  static async create(req, res) {
    const createData = req.body;

    try {
      const validatedData = createGroupParticipantSchema.parse(createData);
      const createDTO = new GroupParticipantDTO(validatedData);
      const result = await GroupParticipantService.create(createDTO);
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

  static async createByAccessCode(req, res) {
    const userId = req.user.id;
    const accessCode = req.params.accessCode;

    try {
      const validatedData = createParticipantByAccessCodeSchema.parse({
        access_code: accessCode,
        user_id: userId,
      });

      const result =
        await GroupParticipantService.createByAccessCode(validatedData);
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

  static async getAllByGroupId(req, res) {
    try {
      const groupId = req.params.groupId;
      const participants =
        await GroupParticipantService.getAllByGroupId(groupId);
      return res.status(200).json(participants);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getAllByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const participants = await GroupParticipantService.getAllByUserId(userId);
      return res.status(200).json(participants);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const participant = await GroupParticipantService.getById(req.params.id);
      return res.status(200).json(participant);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const updateData = {
        id: Number(req.params.id),
        ...req.body,
      };
      const validatedData = updateGroupParticipantSchema.parse(updateData);
      const updateDTO = new GroupParticipantDTO(validatedData);
      const result = await GroupParticipantService.update(updateDTO);
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
      const message = await GroupParticipantService.delete(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async deleteByGroupIdAndUserId(req, res) {
    try {
      const { groupId, userId } = req.params;
      const message = await GroupParticipantService.deleteByGroupIdAndUserId(
        groupId,
        userId,
      );
      return res.status(200).json(message);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
