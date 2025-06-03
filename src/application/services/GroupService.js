import GroupRepository from '../../domain/repositories/GroupRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import CreateGroupDTO from '../dtos/CreateGroupDTO.js';
import UpdateGroupDTO from '../dtos/UpdateGroupDTO.js';
import generateRandomCode from '../../shared/utils/generateRandomCode.cjs';

export default class GroupService {
  static async create(groupDTO) {
    let access_code;
    let isUnique = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 50;

    while (!isUnique && attempts < MAX_ATTEMPTS) {
      attempts++;
      access_code = generateRandomCode(4);

      const activeGroup = await GroupRepository.findByAccessCode(access_code);

      const inactiveGroup =
        await GroupRepository.findInactiveGroupByAccessCode(access_code);

      if (!activeGroup && !inactiveGroup) {
        isUnique = true;
      }
    }

    if (!isUnique) {
      throw new AppError(
        'Could not generate a unique access code. Please try again.',
        500,
      );
    }

    const inactiveGroup =
      await GroupRepository.findInactiveGroupByAccessCode(access_code);

    if (inactiveGroup) {
      const reactivateDTO = new UpdateGroupDTO({
        id: inactiveGroup.id,
        name: groupDTO.name,
        description: groupDTO.description,
        group_owner: groupDTO.group_owner,
      });

      await GroupRepository.reactivateGroup(inactiveGroup.id);
      const updated = await GroupRepository.update(reactivateDTO);

      if (!updated) {
        throw new AppError('Unable to reactivate and update the group.', 400);
      }

      const reactivatedGroup = await GroupRepository.findById(inactiveGroup.id);
      return {
        message: 'Group reactivated and updated successfully.',
        group: reactivatedGroup,
      };
    }

    const createDTO = new CreateGroupDTO({ ...groupDTO, access_code });
    const group = await GroupRepository.create(createDTO);
    return group;
  }

  static async getAll() {
    const groups = await GroupRepository.findAll();
    if (groups.length === 0) {
      throw new AppError('No groups found.', 404);
    }
    return groups;
  }

  static async getById(id) {
    const group = await GroupRepository.findById(id);
    if (!group) {
      throw new AppError('No group found with this ID.', 404);
    }
    return group;
  }

  static async getByAccessCode(accessCode) {
    const group = await GroupRepository.findByAccessCode(accessCode);
    if (!group) {
      throw new AppError('No group found with this access code.', 404);
    }
    return group;
  }

  static async update(updateGroupDTO) {
    const group = await GroupRepository.findById(updateGroupDTO.id);
    if (!group) throw new AppError('No group found to update.', 404);
    const validFields = ['access_code', 'name', 'description', 'balance'];
    const hasValidFields = Object.keys(updateGroupDTO).some(
      (key) => validFields.includes(key) && updateGroupDTO[key] !== undefined,
    );
    if (!hasValidFields) {
      throw new AppError('No valid data provided to update.', 400);
    }
    if (
      updateGroupDTO.access_code &&
      updateGroupDTO.access_code !== group.access_code
    ) {
      const accessCodeExists = await GroupRepository.findByAccessCode(
        updateGroupDTO.access_code,
      );
      if (accessCodeExists) {
        throw new AppError('New access code already in use.', 400);
      }
    }
    const dtoInstance = new UpdateGroupDTO(updateGroupDTO);
    const updated = await GroupRepository.update(dtoInstance);
    if (!updated) {
      throw new AppError('Group data was not updated.', 400);
    }
    const updatedGroup = await GroupRepository.findById(updateGroupDTO.id);
    return { message: 'Group updated successfully.', group: updatedGroup };
  }

  static async delete(id) {
    const group = await GroupRepository.findById(id);
    if (!group) {
      throw new AppError('No group found to deactivate.', 404);
    }
    if (group.deactivated_at) {
      throw new AppError('Group already deactivated.', 400);
    }
    const deleted = await GroupRepository.softDelete(id);
    if (!deleted) {
      throw new AppError('Unable to deactivate group.', 400);
    }
    return { message: 'Group successfully deactivated.' };
  }
}
