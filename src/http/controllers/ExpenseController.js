import { ExpenseService } from "../../application/services/ExpenseService.js";

const expenseService = new ExpenseService();

const ExpenseController = {

  async getAllByGroup(req, res){
    try{
      const expenses = await expenseService.getAllByGroup(req.params.groupId);
      return res.status(200).json(expenses);
    }catch(error){
      res.status(error.statusCode || 500).json( {error: error.message });
    }
  }
}

export { ExpenseController };
