import InstitutionService from '../../application/services/InstitutionService.js';

export default class InstitutionController {
  static async getAll(req, res) {
    try {
      const institutions = await InstitutionService.getAll();

      return res.status(200).json(institutions);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
