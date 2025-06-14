import { Institution } from '../models/Institution.js';
import { OpenFinanceAccount } from '../models/OpenFinanceAccount.js';
import { RechargeFundsTransaction } from '../models/RechargeFundsTransaction.js';

export default class OpenFinanceRepository {
  static async create(createOpenFinanceAccountDTO) {
    return await OpenFinanceAccount.create(createOpenFinanceAccountDTO);
  }

  static async findById(id) {
    return await OpenFinanceAccount.findByPk(id);
  }

  static async findByIdActive(id) {
    return await OpenFinanceAccount.findOne({
      where: {
        id,
        is_active: true,
      },
    });
  }

  static async update(id, createOpenFinanceAccountDTO) {
    await OpenFinanceAccount.update(createOpenFinanceAccountDTO, {
      where: { id },
    });

    return await OpenFinanceAccount.findByPk(id);
  }

  static async revoke(id) {
    await OpenFinanceAccount.update(
      { is_active: false },
      {
        where: { id },
      },
    );
    return await OpenFinanceAccount.findByPk(id);
  }

  static async findAll(user_id) {
    return await OpenFinanceAccount.findAll({
      where: { user_id, is_active: true },
    });
  }

  static async findConsentExists(user_id, institution_id) {
    return await OpenFinanceAccount.findOne({
      where: { user_id, institution_id },
    });
  }
  static async createRecharge(createRechargeFundsTransactionDTO) {
    return await RechargeFundsTransaction.create(
      createRechargeFundsTransactionDTO,
    );
  }
  static async findAllAndInstitutions(user_id) {
    return await OpenFinanceAccount.findAll({
      where: { user_id, is_active: true },
      include: [
        {
          model: Institution,
          attributes: ['id', 'api_url', 'logo_url', 'name'],
        },
      ],
    });
  }
}
