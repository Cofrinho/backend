import UserService from '../../../src/application/services/UserService.js';
import UserRepository from '../../../src/domain/repositories/UserRepository.js';
import * as hashUtils from '../../../src/shared/utils/hash.js';
import * as jwtUtils from '../../../src/shared/utils/jwt.js';
import { EmailService } from '../../../src/shared/utils/mailer.js';
import { AppError } from '../../../src/shared/errors/AppError.js';
import { ReactivateUserDTO } from '../../../src/application/dtos/ReactivateUserDTO.js';
import UserDTO from '../../../src/application/dtos/UserDTO.js';

jest.mock('../../../src/domain/repositories/UserRepository.js');
jest.mock('../../../src/shared/utils/hash.js');
jest.mock('../../../src/shared/utils/jwt.js');
jest.mock('../../../src/shared/utils/mailer.js');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockDTO = {
      name: 'Andrei',
      email: 'andrei@example.com',
      cpf: '12345678900',
      birth_date: '2002-08-10',
      phone: '55999999999',
      password: '12345678',
    };

    it('should create a new user successfully', async () => {
      UserRepository.findInactiveUser.mockResolvedValue(null);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(false);
      hashUtils.hashPassword.mockResolvedValue('hashed-password');
      UserRepository.create.mockResolvedValue({ id: 1, ...mockDTO });
      jwtUtils.generateEmailVerificationToken.mockReturnValue('fake-token');
      EmailService.sendEmailVerification.mockResolvedValue(true);

      const result = await UserService.create(mockDTO);

      expect(UserRepository.create).toHaveBeenCalledWith({
        ...mockDTO,
        password_hash: 'hashed-password',
      });
      expect(jwtUtils.generateEmailVerificationToken).toHaveBeenCalledWith({
        userId: 1,
      });
      expect(EmailService.sendEmailVerification).toHaveBeenCalledWith(
        mockDTO.email,
        'fake-token',
      );
      expect(result).toEqual({ id: 1, ...mockDTO });
    });

    it('should reactivate an inactive user', async () => {
      const inactiveUser = { id: 10, avatar_url: 'url-to-avatar' };
      UserRepository.findInactiveUser.mockResolvedValue(inactiveUser);
      UserRepository.reactivateUser.mockResolvedValue(true);
      hashUtils.hashPassword.mockResolvedValue('hashed-password');
      UserRepository.update.mockResolvedValue({ id: 10, ...mockDTO });

      const result = await UserService.create(mockDTO);

      expect(UserRepository.reactivateUser).toHaveBeenCalledWith(
        inactiveUser.id,
      );
      expect(UserRepository.update).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          message: 'User reactivated and updated successfully.',
          id: 10,
        }),
      );
    });

    it('should throw error if reactivateUser fails', async () => {
      UserRepository.findInactiveUser.mockResolvedValue({ id: 10 });
      UserRepository.reactivateUser.mockResolvedValue(false);

      await expect(UserService.create(mockDTO)).rejects.toThrow(
        'Unable to reactivate the user.',
      );
    });

    it('should throw error if cpf already exists', async () => {
      UserRepository.findInactiveUser.mockResolvedValue(null);
      UserRepository.cpfExists.mockResolvedValue(true);

      await expect(UserService.create(mockDTO)).rejects.toThrow(
        'CPF already registered.',
      );
    });

    it('should throw error if email already exists', async () => {
      UserRepository.findInactiveUser.mockResolvedValue(null);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(true);

      await expect(UserService.create(mockDTO)).rejects.toThrow(
        'Email already registered.',
      );
    });
  });

  describe('getAll', () => {
    it('should return users if found', async () => {
      const users = [{ id: 1 }, { id: 2 }];
      UserRepository.findAll.mockResolvedValue(users);

      const result = await UserService.getAll();

      expect(result).toEqual(users);
    });

    it('should throw error if no users found', async () => {
      UserRepository.findAll.mockResolvedValue([]);

      await expect(UserService.getAll()).rejects.toThrow('No users found.');
    });
  });

  describe('getById', () => {
    it('should return userDTO if user exists', async () => {
      const user = { id: 1, name: 'Andrei' };
      UserRepository.findById.mockResolvedValue(user);

      const result = await UserService.getById(1);

      expect(result).toBeInstanceOf(UserDTO);
      expect(result.name).toBe('Andrei');
    });

    it('should throw error if no user found', async () => {
      UserRepository.findById.mockResolvedValue(null);

      await expect(UserService.getById(1)).rejects.toThrow('No user found.');
    });
  });

  describe('update', () => {
    const existingUser = {
      id: 1,
      cpf: '12345678900',
      email: 'old@example.com',
      password_hash: 'hashedpass',
    };

    it('should update user successfully', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(false);
      hashUtils.checkPasswordHash.mockResolvedValue(true);
      hashUtils.hashPassword.mockResolvedValue('newhashedpass');
      UserRepository.update.mockResolvedValue(true);

      const updateDTO = {
        id: 1,
        cpf: '12345678900',
        email: 'old@example.com',
        password: '123456', // current password for validation
        new_password: '654321',
        name: 'Updated Name',
      };

      const result = await UserService.update(updateDTO);

      expect(UserRepository.update).toHaveBeenCalled();
      expect(result).toEqual({ message: 'User updated successfully.' });
    });

    it('should throw error if user not found', async () => {
      UserRepository.findById.mockResolvedValue(null);

      await expect(UserService.update({ id: 999 })).rejects.toThrow(
        'No user found.',
      );
    });

    it('should throw error if no data provided to update', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);

      await expect(UserService.update({ id: 1 })).rejects.toThrow(
        'No data provided to update.',
      );
    });

    it('should throw error if cpf already registered', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      UserRepository.cpfExists.mockResolvedValue(true);

      const dto = { id: 1, cpf: 'othercpf' };
      await expect(UserService.update(dto)).rejects.toThrow(
        'CPF already registered.',
      );
    });

    it('should throw error if email already registered', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(true);

      const dto = { id: 1, email: 'other@example.com' };
      await expect(UserService.update(dto)).rejects.toThrow(
        'Email already registered.',
      );
    });

    it('should throw error if password is incorrect', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      hashUtils.checkPasswordHash.mockResolvedValue(false);

      const dto = { id: 1, password: 'wrongpass' };
      await expect(UserService.update(dto)).rejects.toThrow(
        'Password is incorrect.',
      );
    });

    it('should delete password if new_password not provided', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(false);
      hashUtils.checkPasswordHash.mockResolvedValue(true);
      UserRepository.update.mockResolvedValue(true);

      const dto = { id: 1, password: '123456' };

      await UserService.update(dto);

      // password should be deleted from dto, so update called without it
      expect(UserRepository.update).toHaveBeenCalledWith(
        expect.not.objectContaining({ password: expect.anything() }),
      );
    });

    it('should throw error if no data was updated', async () => {
      UserRepository.findById.mockResolvedValue(existingUser);
      UserRepository.cpfExists.mockResolvedValue(false);
      UserRepository.emailExists.mockResolvedValue(false);
      hashUtils.checkPasswordHash.mockResolvedValue(true);
      UserRepository.update.mockResolvedValue(false);

      const dto = { id: 1, password: '123456', name: 'New Name' };

      await expect(UserService.update(dto)).rejects.toThrow(
        'No data was updated.',
      );
    });
  });

  describe('delete', () => {
    it('should deactivate user successfully', async () => {
      const user = { id: 1, deactivated_at: null };
      UserRepository.findById.mockResolvedValue(user);
      UserRepository.softDelete.mockResolvedValue(true);

      const result = await UserService.delete(1);

      expect(UserRepository.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'User successfully deactivated.' });
    });

    it('should throw error if user not found', async () => {
      UserRepository.findById.mockResolvedValue(null);

      await expect(UserService.delete(999)).rejects.toThrow('No user found.');
    });

    it('should throw error if user already deactivated', async () => {
      const user = { id: 1, deactivated_at: '2023-01-01' };
      UserRepository.findById.mockResolvedValue(user);

      await expect(UserService.delete(1)).rejects.toThrow(
        'User already deactivated.',
      );
    });

    it('should throw error if unable to deactivate user', async () => {
      const user = { id: 1, deactivated_at: null };
      UserRepository.findById.mockResolvedValue(user);
      UserRepository.softDelete.mockResolvedValue(false);

      await expect(UserService.delete(1)).rejects.toThrow(
        'Unable to deactivate user.',
      );
    });
  });
});
