import { Notification } from '../models/Notification.js';

export default class NotificationRepository {
  static async create(notificationDTO) {
    return await Notification.create(notificationDTO);
  }

  static async findAllByUserId(userId) {
    return await Notification.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
  }

  static async findById(id) {
    return await Notification.findByPk(id);
  }

  static async update(id, notificationDTO) {
    const [updatedRowsCount] = await Notification.update(notificationDTO, {
      where: { id },
    });
    return updatedRowsCount > 0;
  }

  static async markAsSeen(id) {
    const [updatedRowsCount] = await Notification.update(
      { seen: true },
      { where: { id } },
    );
    return updatedRowsCount > 0;
  }

  static async delete(id) {
    const deletedRowsCount = await Notification.destroy({
      where: { id },
    });
    return deletedRowsCount > 0;
  }
}
