import { User } from '../models/User.js';
import { Op } from 'sequelize';

export default class UserRepository {
  static async create(userDTO) {
    return await User.create(userDTO);
  }

  static async findInactiveUser(userDTO) {
    return await User.findOne({
      where: {
        cpf: userDTO.cpf,
        email: userDTO.email,
        deactivated_at: { [Op.not]: null },
      },
    });
  }

  static async reactivateUser(id) {
    return await User.update({ deactivated_at: null }, { where: { id } });
  }

  static async emailExists(email) {
    return await User.findOne({
      where: { email },
    });
  }

  static async cpfExists(cpf) {
    return await User.findOne({
      where: { cpf },
    });
  }

  static async findAll() {
    return await User.findAll({
      where: { deactivated_at: null },
    });
  }

  static async findById(id) {
    return await User.findOne({
      where: {
        id,
        deactivated_at: null,
      },
    });
  }

  static async update(userDTO) {
    const { id, ...dataToUpdate } = userDTO;

    const fieldsToUpdate = {};
    for (const [key, value] of Object.entries(dataToUpdate)) {
      if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }

    const [updatedRowsCount] = await User.update(fieldsToUpdate, {
      where: { id },
    });

    return updatedRowsCount > 0;
  }

  static async softDelete(id) {
    const [updatedRowsCount] = await User.update(
      { deactivated_at: new Date() },
      { where: { id, deactivated_at: null } },
    );
    return updatedRowsCount > 0;
  }
}
