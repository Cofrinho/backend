import { User } from '../models/User.js';

export default class AuthRepository {
  static async login(id) {
    return await User.update(
      { last_login_at: new Date() },
      {
        where: { id },
      },
    );
  }
}
