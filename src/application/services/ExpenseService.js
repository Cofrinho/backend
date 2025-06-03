import { ExpenseRepository } from "../../domain/repositories/ExpenseRepository.js";
import { Group } from "../../domain/models/Group.js";
import { AppError } from '../../shared/errors/AppError.js';
import { ExpenseMemberService } from "./ExpenseMemberService.js";
class ExpenseService {
  constructor(){
    this.expenseRepository = new ExpenseRepository();
    this.expenseMemberService = new ExpenseMemberService();
  }

  async getAllByGroup(groupId){

    if(!(await Group.findByPk(groupId))){
      throw new AppError('group not found', 404);
    }

    const expenses = await this.expenseRepository.findAllByGroup(groupId);

    if(expenses.length === 0){
      return {
        success: true,
        message: 'expenses not found'
      };
    }

    return expenses;
  }

  async getByIdAndGroup(id, groupId){

    if(!(await Group.findByPk(groupId))){
      throw new AppError('group not found', 404);
    }

    if(!(await this.expenseRepository.findById(id))){
      throw new AppError('expense not found', 404);
    }

    const expense = await this.expenseRepository.findByIdAndGroup(id, groupId);
    return expense;
  }

  async save({group_id, name, description, value, due_date, expense_type, participants}){

    if(await this.expenseRepository.findByName(name)){
      throw new AppError('this name of expense exists', 409);
    }

    if(!(await Group.findByPk(group_id))){
      throw new AppError('group not found', 404);
    }

    const { id: expenseId } = await this.expenseRepository.save({
      group_id,
      name,
      description,
      value,
      due_date,
      expense_type
    });

    await this.expenseMemberService.saveAll(expenseId, participants);

    return {
      success: true,
      message: 'Expense created successfully'
    }

  }

}

export { ExpenseService };
