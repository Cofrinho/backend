import OpenFinanceService from '../../application/services/OpenFinanceService.js';

export default class OpenFinanceController {
  static async createConsent(req, res) {
    const user_id = req.params.userId;
    const institution_id = req.params.institutionId;
    const date = req.body?.date || null;

    try {
      const consent = await OpenFinanceService.createConsent(
        user_id,
        institution_id,
        date,
      );

      return res.status(200).json(consent);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async updateConsent(req, res) {
    const consent_id = req.params.consentId;
    const date = req.body?.date || null;

    try {
      const consent = await OpenFinanceService.updateConsent(consent_id, date);

      return res.status(200).json(consent);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async revokeConsent(req, res) {
    const consent_id = req.params.consentId;

    try {
      const consent = await OpenFinanceService.deleteConsent(consent_id);

      return res.status(200).json(consent);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async getByIdConsent(req, res) {
    const consent_id = req.params.consentId;

    try {
      const consent = await OpenFinanceService.getByIdConsent(consent_id);

      return res.status(200).json(consent);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async getAllConsent(req, res) {
    const user_id = req.params.userId;

    try {
      const consents = await OpenFinanceService.getAllConsent(user_id);

      return res.status(200).json(consents);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
