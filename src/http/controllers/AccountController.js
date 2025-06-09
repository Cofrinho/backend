import AccountService from '../../application/services/AccountService.js';

export default class AccountController {
  static async getBalance(req, res) {
    const user_id = req.params.userId;

    try {
      const balance = await AccountService.getBalance(user_id);

      return res.status(200).json({ balance });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getInfo(req, res){
    const { userId } = req.params;
    try{
      const message = await AccountService.getInfo(userId);
      return res.status(200).json(message);
    }catch(error){
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

  static async getAllTransactions(req, res){

    const { userId } = req.params;
    const { limit } = req.query;

    try{
      const transactions = await AccountService.getAllTransactions(userId, limit);
      return res.status(200).json(transactions);
    }catch(error){
      return res.status(error.statusCode || 500).json({error: error.message});
    }
  }
}
