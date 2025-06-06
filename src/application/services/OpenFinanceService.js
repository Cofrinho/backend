import OpenFinanceRepository from '../../domain/repositories/OpenFinanceRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import InstitutionRepository from '../../domain/repositories/InstitutionRepository.js';
import AccountService from './AccountService.js';
import { AppError } from '../../shared/errors/AppError.js';
import axios from 'axios';
import { CreateOpenFinanceAccountDTO } from '../dtos/CreateOpenFinanceAccountDTO.js';
import { CreateRechargeFundsTransactionDTO } from '../dtos/CreateRechargeFundsTransactionDTO.js';
import FetchOpenFinance  from '../../infra/external/FetchOpenFinance.js';
import NotificationService from './NotificationService.js';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO.js';

export default class OpenFinanceService {
  static async createConsent(user_id, institution_id, date) {
    const consentExists = await OpenFinanceRepository.findConsentExists(
      user_id,
      institution_id,
    );

    if (consentExists && consentExists.is_active) {
      throw new AppError('Consent already exists.', 400);
    }

    if (consentExists) {
      return await OpenFinanceService.updateConsent(consentExists.id, date);
    }

    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const institution =
      await InstitutionRepository.findInstitutionById(institution_id);

    if (!institution) {
      throw new AppError('Institution not found.', 400);
    }

    const data = {
      cpf: user.cpf,
      expiration: Boolean(date),
      authorization: true,
      ...(date && { expirationDate: date }),
    };

    const url = `${institution.api_url}/openfinance`;

    let response;

    try {
      response = await axios.post(url, data);
    } catch (error) {
      if (error.response) {
        throw new AppError(
          error.response.data.error || 'Failed to create consent.',
          error.response.status,
        );
      } else if (error.request) {
        throw new AppError('No response from institution.', 502);
      } else {
        throw new AppError('Unknown error while creating consent.', 500);
      }
    }

    if (!response.data.success == true) {
      throw new AppError('Failed to create consent.', 400);
    }

    const { account, agency } = response.data.data.account;

    const createOpenFinanceAccountDTO = new CreateOpenFinanceAccountDTO({
      user_id,
      institution_id,
      agency,
      account_number: account,
      is_active: true,
      expired_at: date,
    });

    return await OpenFinanceRepository.create(createOpenFinanceAccountDTO);
  }
  static async updateConsent(consent_id, date) {
    const consent = await OpenFinanceRepository.findById(consent_id);

    if (!consent) {
      throw new AppError('Consent not found.', 400);
    }

    const user = await UserRepository.findById(consent.user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const institution = await InstitutionRepository.findInstitutionById(
      consent.institution_id,
    );

    if (!institution) {
      throw new AppError('Institution not found.', 400);
    }

    const data = {
      cpf: user.cpf,
      expiration: Boolean(date),
      authorization: true,
      ...(date && { expirationDate: date }),
    };

    const url = `${institution.api_url}/openfinance/update`;

    let response;

    try {
      response = await axios.patch(url, data);
    } catch (error) {
      if (error.response) {
        throw new AppError(
          error.response.data.error || 'Failed to update consent.',
          error.response.status,
        );
      } else if (error.request) {
        throw new AppError('No response from institution.', 502);
      } else {
        throw new AppError('Unknown error while updating consent.', 500);
      }
    }

    if (response.data.success !== true) {
      throw new AppError('Failed to update consent.', 400);
    }

    const { account, agency } = response.data.data.account;

    const createOpenFinanceAccountDTO = new CreateOpenFinanceAccountDTO({
      user_id: consent.user_id,
      institution_id: consent.institution_id,
      agency,
      account_number: account,
      is_active: true,
      expired_at: date,
    });

    return await OpenFinanceRepository.update(
      consent_id,
      createOpenFinanceAccountDTO,
    );
  }
  static async deleteConsent(consent_id) {
    const consent = await OpenFinanceRepository.findById(consent_id);

    if (!consent) {
      throw new AppError('Consent not found.', 400);
    }

    if (!consent.is_active) {
      throw new AppError('Consent has already been revoked.', 400);
    }

    const user = await UserRepository.findById(consent.user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const institution = await InstitutionRepository.findInstitutionById(
      consent.institution_id,
    );

    if (!institution) {
      throw new AppError('Institution not found.', 400);
    }

    const body = {
      cpf: user.cpf,
      authorization: false,
    };

    const url = `${institution.api_url}/openfinance/revoke`;

    let response;
    try {
      response = await axios.patch(url, body);
    } catch (error) {
      if (error.response) {
        throw new AppError(
          error.response.data.error || 'Failed to revoke consent.',
          error.response.status,
        );
      } else if (error.request) {
        throw new AppError('No response from institution.', 502);
      } else {
        throw new AppError('Unknown error while revoking consent.', 500);
      }
    }

    if (response.data.success !== true) {
      throw new AppError('Failed to revoke consent.', 400);
    }

    return await OpenFinanceRepository.revoke(consent_id);
  }
  static async getByIdConsent(consent_id) {
    const consent = await OpenFinanceRepository.findByIdActive(consent_id);

    if (!consent) {
      throw new AppError('Consent not found.', 400);
    }
    return consent;
  }
  static async getAllConsent(user_id) {
    const consents = await OpenFinanceRepository.findAll(user_id);

    if (!consents.length) {
      throw new AppError('No active consents found.', 400);
    }
    return consents;
  }
  static async getBalanceByInstitution(user_id, institution_id) {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const institution =
      await InstitutionRepository.findInstitutionById(institution_id);

    if (!institution) {
      throw new AppError('Institution not found.', 400);
    }

    const consent = await OpenFinanceRepository.findConsentExists(
      user_id,
      institution_id,
    );

    if (!consent) {
      throw new AppError('Consent not found.', 400);
    }

    if (!consent.is_active) {
      throw new AppError('Consent is not active.', 400);
    }

    const params = {
      account: consent.account_number,
      agency: consent.agency,
    };

    const url = `${institution.api_url}/openfinance`;

    let response;

    try {
      response = await axios.get(url, { params });
    } catch (error) {
      if (error.response) {
        throw new AppError(
          error.response.data.error || 'Failed to fetch account balance.',
          error.response.status,
        );
      } else if (error.request) {
        throw new AppError('No response from institution.', 502);
      } else {
        throw new AppError('Unknown error while fetching balance.', 500);
      }
    }

    if (!response.data.success) {
      throw new AppError('Failed to fetch account balance.', 400);
    }

    const balance = response.data.data.balance;

    return balance;
  }
  static async createRecharge(user_id, institution_id, amount) {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const institution =
      await InstitutionRepository.findInstitutionById(institution_id);

    if (!institution) {
      throw new AppError('Institution not found.', 400);
    }

    const consent = await OpenFinanceRepository.findConsentExists(
      user_id,
      institution_id,
    );

    if (!consent) {
      throw new AppError('Consent not found.', 400);
    }

    if (!consent.is_active) {
      throw new AppError('Consent is not active.', 400);
    }

    const data = {
      account: consent.account_number,
      agency: consent.agency,
      amount,
    };

    const url = `${institution.api_url}/openfinance/transaction`;

    let response;
    try {
      response = await axios.post(url, data);
    } catch (error) {
      if (error.response) {
        throw new AppError(
          error.response.data.error ||
            'Failed to perform recharge transaction.',
          error.response.status,
        );
      } else if (error.request) {
        throw new AppError('No response from institution.', 502);
      } else {
        throw new AppError('Unknown error during recharge transaction.', 500);
      }
    }

    if (!response.data.success) {
      throw new AppError('Recharge transaction failed.', 400);
    }

    const createRechargeFundsTransactionDTO =
      new CreateRechargeFundsTransactionDTO({
        amount,
        user_id,
        institution_id,
        type: 'OpenFinance',
      });

    const rechargeFundsTransaction = await OpenFinanceRepository.createRecharge(
      createRechargeFundsTransactionDTO,
    );

    await AccountService.updateBalance(user_id, amount);
    
    const createNotificationDTO = new CreateNotificationDTO({
      user_id: rechargeFundsTransaction.user_id,
      type: 'RECHARGE',
      reference_id: rechargeFundsTransaction.id,
    });

    await NotificationService.create(createNotificationDTO);

    return rechargeFundsTransaction;
  }

  static async getHomeOpenFinance(userId, action){

    if(!(await UserRepository.findById(userId))){
      throw new AppError('User not found', 404);
    }

    const accountsOpenFinance = await OpenFinanceRepository.findAllAndInstitutions(userId);
    if(accountsOpenFinance.length === 0){
      throw new AppError('Account not found', 404);
    }

    const balances = await Promise.all(accountsOpenFinance.map(account => FetchOpenFinance.getBalanceAccount(account.Institution.api_url,
      account.agency,
      account.account_number
    )));

    if(action === 'balance'){

      const balanceTotal = balances.reduce((acc, balance) => acc + balance, 0);

      const logos = await Promise.all(accountsOpenFinance.map(account => account.Institution.logo_url));
      return {
        balance: balanceTotal,
        logos
      }

    }else{
      const accounts = accountsOpenFinance.map((account, index) => ({
        institutionName: account.Institution.name,
        account: account.account_number,
        agency: account.agency,
        balance: balances[index]
      }))

      return accounts;
    }
  }
}