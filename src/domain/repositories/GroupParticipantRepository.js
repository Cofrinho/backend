import { GroupParticipant } from '../models/GroupParticipant.js';
import { Op } from 'sequelize';

export default class GroupParticipantRepository {
  static async create(groupParticipantDTO) {
    return await GroupParticipant.create(groupParticipantDTO);
  }

  static async findInactiveByGroupIdAndUserId(groupId, userId) {
    return await GroupParticipant.findOne({
      where: {
        group_id: groupId,
        user_id: userId,
        deactivated_at: { [Op.not]: null },
      },
    });
  }

  static async reactivateParticipant(id) {
    return await GroupParticipant.update(
      { deactivated_at: null },
      { where: { id } },
    );
  }

  static async findByGroupIdAndUserId(groupId, userId) {
    return await GroupParticipant.findOne({
      where: {
        group_id: groupId,
        user_id: userId,
        deactivated_at: null,
      },
    });
  }

  static async findAll() {
    return await GroupParticipant.findAll({
      where: { deactivated_at: null },
    });
  }

  static async findById(id) {
    return await GroupParticipant.findOne({
      where: {
        id,
        deactivated_at: null,
      },
    });
  }

  static async update(groupParticipantDTO) {
    const { id, ...dataToUpdate } = groupParticipantDTO;

    const fieldsToUpdate = {};
    for (const [key, value] of Object.entries(dataToUpdate)) {
      if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }
    const [updatedRowsCount] = await GroupParticipant.update(fieldsToUpdate, {
      where: { id },
    });

    return updatedRowsCount > 0;
  }

  static async softDelete(id) {
    const [updatedRowsCount] = await GroupParticipant.update(
      { deactivated_at: new Date() },
      { where: { id, deactivated_at: null } },
    );
    return updatedRowsCount > 0;
  }
}
