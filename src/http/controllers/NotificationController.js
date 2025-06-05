import NotificationService from '../../application/services/NotificationService.js';
import CreateNotificationDTO from '../../application/dtos/CreateNotificationDTO.js';
import {
  createNotificationSchema,
  markAsSeenSchema,
  userIdParamSchema,
} from '../validations/notificationValidator.js';
import { ZodError } from 'zod';

export default class NotificationController {
  static async create(req, res) {
    try {
      const validatedData = createNotificationSchema.parse(req.body);
      const createNotificationDTO = new CreateNotificationDTO(validatedData);
      const notification = await NotificationService.create(
        createNotificationDTO,
      );
      return res.status(201).json(notification);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: error.errors.map((e) => e.message) });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getAllByUserId(req, res) {
    try {
      const { user_id } = userIdParamSchema.parse({
        user_id: req.params.userId,
      });
      const notifications = await NotificationService.getAllByUserId(user_id);
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async markAsSeen(req, res) {
    try {
      const validatedData = markAsSeenSchema.parse({ id: req.params.id });
      const result = await NotificationService.markAsSeen(validatedData.id);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: error.errors.map((e) => e.message) });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const result = await NotificationService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
