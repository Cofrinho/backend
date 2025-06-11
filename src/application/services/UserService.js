import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { hashPassword, checkPasswordHash } from '../../shared/utils/hash.js';
import { ReactivateUserDTO } from '../dtos/ReactivateUserDTO.js';
import UserDTO from '../dtos/UserDTO.js';
import { generateEmailVerificationToken } from '../../shared/utils/jwt.js';
import { EmailService } from '../../shared/utils/mailer.js';

export default class UserService {
  static async create(userDTO) {
    const inactiveUser = await UserRepository.findInactiveUser(userDTO);

    if (inactiveUser) {
      const isActiveUser = await UserRepository.reactivateUser(inactiveUser.id);

      if (!isActiveUser) {
        throw new AppError('Unable to reactivate the user.', 400);
      }
      const hashedPassword = await hashPassword(userDTO.password);

      const reactivateUserDTO = new ReactivateUserDTO({
        id: inactiveUser.id,
        name: userDTO.name,
        email: userDTO.email,
        cpf: userDTO.cpf,
        birth_date: userDTO.birth_date,
        phone: userDTO.phone,
        avatar_url: inactiveUser.avatar_url,
        password: hashedPassword,
      });

      const result = await UserRepository.update(reactivateUserDTO);
      return {
        message: 'User reactivated and updated successfully.',
        ...result,
      };
    }

    const cpfExists = await UserRepository.cpfExists(userDTO.cpf);

    if (cpfExists) {
      throw new AppError('CPF already registered.', 400);
    }

    const emailExists = await UserRepository.emailExists(userDTO.email);

    if (emailExists) {
      throw new AppError('Email already registered.', 400);
    }

    const hashedPassword = await hashPassword(userDTO.password);

    const userWithHashedPassword = {
      ...userDTO,
      password_hash: hashedPassword,
    };

    const user = await UserRepository.create(userWithHashedPassword);

    const jwtUserPaylod = {
      userId: user.id,
    };

    const emailVerificationToken =
      generateEmailVerificationToken(jwtUserPaylod);

    await EmailService.sendEmailVerification(
      user.email,
      emailVerificationToken,
    );

    return user;
  }
  static async getAll() {
    const users = await UserRepository.findAll();
    if (users.length === 0) {
      throw new AppError('No users found.', 404);
    }
    return users;
  }
  static async getById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppError('No user found.', 404);
    }
    const userDTO = new UserDTO(user);
    return userDTO;
  }

  static async update(userDTO) {
    const user = await UserRepository.findById(userDTO.id);

    if (!user) {
      throw new AppError('No user found.', 404);
    }

    const fieldsUserDTO = { ...userDTO };
    delete fieldsUserDTO.id;

    const hasFieldsToUpdate = Object.values(fieldsUserDTO).some(
      (value) => value !== undefined,
    );

    if (!hasFieldsToUpdate) {
      throw new AppError('No data provided to update.', 400);
    }

    if (userDTO.cpf && userDTO.cpf !== user.cpf) {
      const cpfExists = await UserRepository.cpfExists(userDTO.cpf);
      if (cpfExists) {
        throw new AppError('CPF already registered.', 400);
      }
    }

    if (userDTO.email && userDTO.email !== user.email) {
      const emailExists = await UserRepository.emailExists(userDTO.email);
      if (emailExists) {
        throw new AppError('Email already registered.', 400);
      }
    }

    if (userDTO.password) {
      const isPasswordValid = await checkPasswordHash(
        userDTO.password,
        user.password_hash,
      );
      if (!isPasswordValid) {
        throw new AppError('Password is incorrect.', 400);
      }
    }

    if (userDTO.new_password) {
      userDTO.password = await hashPassword(userDTO.new_password);
      delete userDTO.new_password;
    } else {
      delete userDTO.password;
    }

    const updated = await UserRepository.update(userDTO);

    if (!updated) {
      throw new AppError('No data was updated.', 400);
    }

    return { message: 'User updated successfully.' };
  }

  static async delete(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new AppError('No user found.', 404);
    }

    if (user.deactivated_at) {
      throw new AppError('User already deactivated.', 400);
    }

    const deleted = await UserRepository.softDelete(id);

    if (!deleted) {
      throw new AppError('Unable to deactivate user.', 400);
    }

    return { message: 'User successfully deactivated.' };
  }
}
