import OpenFinanceRepository from '../../domain/repositories/OpenFinanceRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import InstitutionRepository from '../../domain/repositories/InstitutionRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import axios from 'axios';
import { CreateOpenFinanceAccountDTO } from '../dtos/CreateOpenFinanceAccountDTO.js';

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

    console.log(data);

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
}
