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
  static async getBalanceByInstitution(req, res) {
    const user_id = req.params.userId;
    const institution_id = req.params.institutionId;

    try {
      const balance = await OpenFinanceService.getBalanceByInstitution(
        user_id,
        institution_id,
      );

      return res.status(200).json({ balance });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  static async createRecharge(req, res) {
    const user_id = req.params.userId;
    const institution_id = req.params.institutionId;
    const { amount } = req.body;

    try {
      const recharge = await OpenFinanceService.createRecharge(
        user_id,
        institution_id,
        amount,
      );

      return res.status(200).json(recharge);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getHomeOpenFinance(req, res){
    const { userId } = req.params;
    try{
      const data = await OpenFinanceService.getHomeOpenFinance(userId);
      res.status(200).json(data);
    }catch(error){
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
