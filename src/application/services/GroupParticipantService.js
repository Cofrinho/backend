import GroupParticipantRepository from '../../domain/repositories/GroupParticipantRepository.js';
import GroupRepository from '../../domain/repositories/GroupRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { CreateGroupParticipantDTO } from '../dtos/CreateGroupParticipantDTO.js';
import { UpdateGroupParticipantDTO } from '../dtos/UpdateGroupParticipantDTO.js';

export default class GroupParticipantService {
  static async create(participantDTO) {
    const { group_id, user_id } = participantDTO;

    const groupExists = await GroupRepository.findById(group_id);
    if (!groupExists) {
      throw new AppError('Group not found.', 404);
    }

    const userExists = await UserRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('User not found.', 404);
    }

    const inactiveParticipant =
      await GroupParticipantRepository.findInactiveByGroupIdAndUserId(
        group_id,
        user_id,
      );

    if (inactiveParticipant) {
      const reactivated =
        await GroupParticipantRepository.reactivateParticipant(
          inactiveParticipant.id,
        );
      if (!reactivated) {
        throw new AppError('Unable to reactivate participant.', 400);
      }
      const reactivatedParticipant = await GroupParticipantRepository.findById(
        inactiveParticipant.id,
      );
      return {
        message: 'Participant reactivated successfully.',
        participant: reactivatedParticipant,
      };
    }

    const existingParticipant =
      await GroupParticipantRepository.findByGroupIdAndUserId(
        group_id,
        user_id,
      );

    if (existingParticipant) {
      throw new AppError(
        'User is already an active participant in this group.',
        400,
      );
    }

    const createDTO = new CreateGroupParticipantDTO({ group_id, user_id });
    const participant = await GroupParticipantRepository.create(createDTO);
    return participant;
  }

  static async getAllByGroupId(groupId) {
    const groupExists = await GroupRepository.findById(groupId);
    if (!groupExists) {
      throw new AppError('Group not found.', 404);
    }

    const allParticipants = await GroupParticipantRepository.findAll();
    const participants = allParticipants.filter((p) => p.group_id == groupId);

    if (participants.length === 0) {
      throw new AppError('No participants found for this group.', 404);
    }
    return participants;
  }

  static async getAllByUserId(userId) {
    const userExists = await UserRepository.findById(userId);
    if (!userExists) {
      throw new AppError('User not found.', 404);
    }

    const allParticipants = await GroupParticipantRepository.findAll();
    const participants = allParticipants.filter((p) => p.user_id == userId);

    if (participants.length === 0) {
      throw new AppError('This user is not a participant in any group.', 404);
    }
    return participants;
  }

  static async getById(id) {
    const participant = await GroupParticipantRepository.findById(id);
    if (!participant) {
      throw new AppError('No participant found with this ID.', 404);
    }
    return participant;
  }

  static async update(updateParticipantDTO) {
    const { id } = updateParticipantDTO;
    const participant = await GroupParticipantRepository.findById(id);

    if (!participant) {
      throw new AppError('No participant found to update.', 404);
    }

    const validFields = ['group_id', 'user_id'];
    const hasValidFields = Object.keys(updateParticipantDTO).some(
      (key) =>
        validFields.includes(key) && updateParticipantDTO[key] !== undefined,
    );

    if (!hasValidFields) {
      throw new AppError('No valid data provided to update.', 400);
    }

    const dtoInstance = new UpdateGroupParticipantDTO(updateParticipantDTO);
    const updated = await GroupParticipantRepository.update(dtoInstance);

    if (!updated) {
      throw new AppError('Participant data was not updated.', 400);
    }
    const updatedParticipant = await GroupParticipantRepository.findById(id);
    return {
      message: 'Participant updated successfully.',
      participant: updatedParticipant,
    };
  }

  static async delete(id) {
    const participant = await GroupParticipantRepository.findById(id);

    if (!participant) {
      throw new AppError('No participant found to deactivate.', 404);
    }

    if (participant.deactivated_at) {
      throw new AppError('Participant already deactivated.', 400);
    }

    const deleted = await GroupParticipantRepository.softDelete(id);

    if (!deleted) {
      throw new AppError('Unable to deactivate participant.', 400);
    }

    return { message: 'Participant successfully deactivated.' };
  }

  static async deleteByGroupIdAndUserId(groupId, userId) {
    const participant = await GroupParticipantRepository.findByGroupIdAndUserId(
      groupId,
      userId,
    );

    if (!participant) {
      throw new AppError(
        'No active participant found for this group and user to deactivate.',
        404,
      );
    }

    const deleted = await GroupParticipantRepository.softDelete(participant.id);

    if (!deleted) {
      throw new AppError('Unable to deactivate participant.', 400);
    }
    return { message: 'Participant successfully deactivated from group.' };
  }
}
