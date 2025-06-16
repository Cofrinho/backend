'use strict';

const { v4: uuidv4 } = require('uuid');

const GROUP_PARTICIPANTS = {
  1: [1, 2, 3],
  2: [2, 3, 4, 5],
  3: [3, 6, 7],
  4: [4, 8, 9, 10],
  5: [5, 1, 3, 7],
  6: [11, 12, 13, 14, 15],
  7: [11, 12, 13, 14, 15],
  8: [11, 12, 13, 14, 15],
  9: [11, 12, 13, 14, 15],
  10: [11, 12, 13, 14, 15]
};

const GROUP_OWNERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 11,
  7: 12,
  8: 13,
  9: 14,
  10: 15
};

const NOTIFICATION_TYPES = {
  EXPENSE: 'EXPENSE',
  PAYMENT: 'PAYMENT',
  TRANSACTION: 'TRANSACTION'
};

const GROUP_EXPENSES = {
  1: ['Supermercado do Mês', 'Conta de Luz', 'Internet Residencial'],
  2: ['Pizza de Sexta', 'Presente de Aniversário', 'Assinatura do Spotify'],
  3: ['Combustível', 'Pedágio', 'Aluguel do Chalé'],
  4: ['Carvão e Carne', 'Bebidas', 'Utensílios'],
  5: ['Compra de Domínio', 'Ferramentas de Desenvolvimento', 'Hospedagem'],
  6: ['Aluguel do Campo', 'Uniformes', 'Bola Nova'],
  7: ['Passagens Aéreas', 'Seguro Viagem', 'Hospedagem'],
  8: ['Troca de Óleo', 'Freio', 'Pneu Novo'],
  9: ['API GPT-4', 'Créditos OpenAI', 'Servidor Node'],
  10: ['Instância EC2', 'Bucket S3', 'RDS MySQL']
};

module.exports = {
  up: async (queryInterface) => {
    const notifications = [];
    const expenses = [];
    const expenseMembers = [];
    const expenseTransactions = [];
    const expensesPayments = [];

    let expenseIdCounter = 1;

    for (let groupId = 1; groupId <= 10; groupId++) {
      const participants = GROUP_PARTICIPANTS[groupId];
      const groupOwner = GROUP_OWNERS[groupId];
      const namedExpenses = GROUP_EXPENSES[groupId];

      for (const name of namedExpenses) {
        const value = parseFloat((Math.random() * 300 + 100).toFixed(2));
        const valuePerMember = parseFloat((value / participants.length).toFixed(2));
        let totalPaid = 0;
        const createdAt = new Date();

        const expense = {
          id: expenseIdCounter,
          group_id: groupId,
          name,
          description: `Pagamento referente a ${name.toLowerCase()} do grupo ${groupId}`,
          value,
          balance: value,
          status: 'PENDING',
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          created_at: createdAt,
          updated_at: createdAt
        };

        for (const userId of participants) {
          notifications.push({
            user_id: userId,
            seen: false,
            type: NOTIFICATION_TYPES.EXPENSE,
            reference_id: `${expenseIdCounter}`,
            created_at: createdAt,
            updated_at: createdAt
          });
        }

        for (const userId of participants) {
          const chance = Math.random();
          let amountPaid = 0;
          let percentagePaid = 0;
          let paidAt = null;
          let status = 'PENDING';

          if (chance > 0.6) {
            amountPaid = valuePerMember;
            percentagePaid = 100;
            paidAt = new Date(createdAt.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000);
            status = 'PENDING';
          } else if (chance > 0.3) {
            amountPaid = parseFloat((valuePerMember * (Math.random() * 0.7 + 0.3)).toFixed(2));
            percentagePaid = parseFloat(((amountPaid / valuePerMember) * 100).toFixed(2));
            paidAt = new Date(createdAt.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000);
            status = 'PENDING';
          }

          totalPaid += amountPaid;

          expenseMembers.push({
            expense_id: expense.id,
            user_id: userId,
            amount: valuePerMember,
            percentage_paid: percentagePaid,
            status: status,
            paid_at: paidAt,
            created_at: createdAt,
            updated_at: createdAt
          });

          if (amountPaid > 0) {
            const paymentId = uuidv4();
            const transactionId = uuidv4();

            expensesPayments.push({
              id: paymentId,
              value: amountPaid,
              expense_id: expense.id,
              user_id: userId,
              created_at: paidAt,
              updated_at: paidAt
            });

            expenseTransactions.push({
              id: transactionId,
              user_id: userId,
              expense_id: expense.id,
              amount: amountPaid,
              description: `Pagamento de ${name}`,
              created_at: paidAt,
              updated_at: paidAt
            });

            notifications.push({
              user_id: userId,
              seen: false,
              type: NOTIFICATION_TYPES.TRANSACTION,
              reference_id: transactionId,
              created_at: paidAt,
              updated_at: paidAt
            });

            notifications.push({
              user_id: groupOwner,
              seen: false,
              type: NOTIFICATION_TYPES.PAYMENT,
              reference_id: paymentId,
              created_at: paidAt,
              updated_at: paidAt
            });
          }
        }

        let status = 'PENDING';
        let paidAt = null;

        if (totalPaid >= value) {
          status = 'PAYMENT';
          paidAt = new Date();
        } else if (totalPaid > 0) {
          status = 'PENDING';
        }

        expense.status = status;
        expense.balance = parseFloat((value - totalPaid).toFixed(2));
        expense.paid_at = paidAt;

        expenses.push(expense);
        expenseIdCounter++;
      }
    }

    await queryInterface.bulkInsert('expenses', expenses);
    await queryInterface.bulkInsert('expense_members', expenseMembers);
    await queryInterface.bulkInsert('expense_transactions', expenseTransactions);
    await queryInterface.bulkInsert('expenses_payments', expensesPayments);
    await queryInterface.bulkInsert('notifications', notifications);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('notifications', null, {});
    await queryInterface.bulkDelete('expenses_payments', null, {});
    await queryInterface.bulkDelete('expense_transactions', null, {});
    await queryInterface.bulkDelete('expense_members', null, {});
    await queryInterface.bulkDelete('expenses', null, {});
  }
};
