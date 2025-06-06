import NotificationRepository from '../../domain/repositories/NotificationRepository.js';
import { AppError } from '../../shared/errors/AppError.js';

export default class NotificationService {
  static async create(notificationDTO) {
    const notification = await NotificationRepository.create(notificationDTO);
    return notification;
  }

  static async getAllByUserId(userId) {
    const notifications = await NotificationRepository.findAllByUserId(userId);
    return notifications;
  }

  static async getById(id) {
    const notification = await NotificationRepository.findById(id);
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
