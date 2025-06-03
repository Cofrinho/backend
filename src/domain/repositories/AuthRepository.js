import { User } from '../models/User.js';
import { PasswordResetCode } from '../models/PasswordResetCode.js';
import { Op } from 'sequelize';

export default class AuthRepository {
  static async login(id) {
    return await User.update(
      { last_login_at: new Date() },
      {
        where: { id },
      },
    );
  }
  static async createPasswordResetCode(passwordResetCodeDTO) {
    return await PasswordResetCode.create(passwordResetCodeDTO);
  }

  static async findPasswordResetCode(user) {
    return await PasswordResetCode.findOne({
      where: {
        user_id: user.id,
        expires_at: { [Op.gt]: new Date() },
      },
      order: [['created_at', 'DESC']],
    });
  }

  static async deletePasswordResetCode(user_id) {
    return await PasswordResetCode.destroy({ where: { user_id } });
  }

  static async resetPassword(id, password) {
    return await User.update(
      { password_hash: password },
      {
        where: { id },
      },
    );
  }
}
