import NotificationRepository from '../../domain/repositories/NotificationRepository.js';
import { AppError } from '../../shared/errors/AppError.js';

export default class NotificationService {
  static async create(notificationDTO) {
    const notification = await NotificationRepository.create(notificationDTO);
    return notification;
  }

  static async getAllByUserId(userId) {
    const notifications = await NotificationRepository.findAllByUserId(userId);
    if (!notifications || notifications.length === 0) {
      throw new AppError('No notifications found for this user.', 404);
    }
    return notifications;
  }

  static async getById(id) {
    const notification = await NotificationRepository.findById(id);
    if (!notification) {
      throw new AppError('Notification not found.', 404);
    }
    return notification;
  }

  static async markAsSeen(id) {
    const updated = await NotificationRepository.markAsSeen(id);
    if (!updated) {
      throw new AppError('Unable to mark notification as seen.', 400);
    }
    return { message: 'Notification marked as seen.' };
  }

  static async delete(id) {
    const deleted = await NotificationRepository.delete(id);
    if (!deleted) {
      throw new AppError('Unable to delete notification.', 400);
    }
    return { message: 'Notification deleted successfully.' };
  }
}
