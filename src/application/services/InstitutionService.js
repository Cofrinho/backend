import InstitutionRepository from '../../domain/repositories/InstitutionRepository.js';
import { AppError } from '../../shared/errors/AppError.js';

export default class InstitutionService {
  static async getAll() {
    const institutions = await InstitutionRepository.getAll();

    if (!institutions) {
      throw new AppError('Institutions not found.', 400);
    }

    return institutions;
  }
}
