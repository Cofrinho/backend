import axios from "axios";
import { AppError } from "../../shared/errors/AppError.js";

export default class FetchOpenFinance {
  static async getBalanceAccount(url, agency, account) {
    try {
      const response = await axios.get(`${url}/openfinance`, {
        params: {
          agency,
          account,
        },
      });

      return parseFloat(response.data.data.balance);
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
  }
}
