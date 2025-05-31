import { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import { Group } from "../../domain/models/Group.js";
import { AppError } from '../../shared/errors/AppError.js';

class ExpenseService {
  constructor(){
    this.expenseRepository = new ExpenseRepository();
  }

  async getAllByGroup(groupId){
    const expenses = await this.expenseRepository.findAllByGroup(groupId);

    if(!(await Group.findByPk(groupId))){
      throw new AppError('Grupo não encontrado', 404);
    }

    if(expenses.length === 0){
      return {
        success: true,
        message: 'Nenhuma despesa encontrada'
      };
    }

    return expenses;
  }
}

export { ExpenseService };
