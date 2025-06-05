import { RechargeFundsTransaction } from "../models/RechargeFundsTransaction.js";

export default class RechargeFundTransactionRepository {
  static async findAllByUserId(userId){
    const recharges = await RechargeFundsTransaction.findAll({
      where: { user_id: userId },
      attributes: ['id', 'amount', 'created_at'],
      order: [['created_at', 'DESC']]
    });
    return recharges;
  }
}
