import { Institution } from '../models/Institution.js';

export default class InstitutionRepository {
  static async getAll() {
    return await Institution.findAll();
  }
  static async findInstitutionById(id) {
    return await Institution.findByPk(id);
  }
}
