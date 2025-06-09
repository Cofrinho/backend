import { Group } from '../models/Group.js';
import { Op } from 'sequelize';

export default class GroupRepository {
  static async create(groupDTO) {
    return await Group.create(groupDTO);
  }

  static async findInactiveGroupByAccessCode(accessCode) {
    return await Group.findOne({
      where: {
        access_code: accessCode,
        deactivated_at: { [Op.not]: null },
      },
    });
  }

  static async reactivateGroup(id) {
    return await Group.update({ deactivated_at: null }, { where: { id } });
  }

  static async findByAccessCode(accessCode) {
    return await Group.findOne({
      where: {
        access_code: accessCode,
        deactivated_at: null,
      },
    });
  }

  static async findAll() {
    return await Group.findAll({
      where: { deactivated_at: null },
    });
  }

  static async findById(id) {
    return await Group.findOne({
      where: {
        id,
        deactivated_at: null,
      },
    });
  }

  static async findAllByIds(ids) {
    return await Group.findAll({
      where: {
        id: { [Op.in]: ids },
        deactivated_at: null,
      },
    });
  }

  static async update(groupDTO) {
    const { id, ...dataToUpdate } = groupDTO;

    const fieldsToUpdate = {};
    for (const [key, value] of Object.entries(dataToUpdate)) {
      if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }

    const [updatedRowsCount] = await Group.update(fieldsToUpdate, {
      where: { id },
    });

    return updatedRowsCount > 0;
  }

  static async softDelete(id) {
    const [updatedRowsCount] = await Group.update(
      { deactivated_at: new Date() },
      { where: { id, deactivated_at: null } },
    );
    return updatedRowsCount > 0;
  }
}
