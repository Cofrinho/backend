import { RechargeFundsTransaction } from "../models/RechargeFundsTransaction.js";

export default class RechargeFundTransactionRepository {
  static async findLastByUserId(userId, limit = 3){
    const recharges = await RechargeFundsTransaction.findAll({
      where: { user_id: userId },
      attributes: ['id', 'amount', 'created_at'],
      order: [['created_at', 'DESC']],
      limit
    });
    return recharges;
  }

  static async findById(id){
    return await RechargeFundsTransaction.findByPk(id);
  }
}
