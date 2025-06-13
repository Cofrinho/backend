import NotificationRepository from '../../domain/repositories/NotificationRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import RechargeFundTransactionRepository from '../../domain/repositories/RechargeFundTransRepository.js';
import ExpensePaymentRepository from '../../domain/repositories/ExpensePaymentRepository.js';
import { ExpenseRepository } from '../../domain/repositories/ExpenseRepository.js';
import { ExpenseTransactionRepository } from '../../domain/repositories/ExpenseTransactionRepository.js';

export default class NotificationService {
  static async create(notificationDTO) {
    const notification = await NotificationRepository.create(notificationDTO);
    return notification;
  }

  static async getAllByUserId(userId) {
    const notifications = await NotificationRepository.findAllByUserId(userId);
    const mapNotifications = async (t) => {
      const base = {
        id: t.id,
        date: t.created_at,
      };

      if (t.type === 'RECHARGE') {
        const recharge = await RechargeFundTransactionRepository.findById(
          t.reference_id,
        );

        return {
          ...base,
          title: 'Recarga Cofrinho',
          value: recharge.amount,
        };
      }

      if (t.type === 'PAYMENT') {
        const payment = await ExpensePaymentRepository.findById(t.reference_id);
        return {
          ...base,
          title: payment.Expense.name,
          value: payment.value,
          group: `Grupo ${payment.Expense.Group.id}`,
        };
      }

      if (t.type === 'EXPENSE') {
        const expenseRepository = new ExpenseRepository();
        const expense = await expenseRepository.findByIdAndGroupId(
          t.reference_id,
        );
        return {
          ...base,
          title: expense.name,
          value: expense.value,
          description: expense.description,
          group: `Grupo ${expense.Group.id}`,
        };
      }

      if (t.type === 'TRANSACTION') {
        const expenseTransactionRepository = new ExpenseTransactionRepository();
        const transaction = await expenseTransactionRepository.findById(
          t.reference_id,
        );
        return {
          ...base,
          title: transaction.Expense.name,
          value: transaction.amount,
          description: transaction.description,
          group: `Grupo ${transaction.Expense.Group.id}`,
        };
      }
    };
    const result = await Promise.all(
      notifications.map((t) => mapNotifications(t)),
    );
    return result;
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
