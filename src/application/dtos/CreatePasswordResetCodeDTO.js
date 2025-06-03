class CreatePasswordResetCodeDTO {
  constructor({ user_id, code_hash, expires_at }) {
    this.user_id = user_id;
    this.code_hash = code_hash;
    this.expires_at = expires_at;
  }
}

export { CreatePasswordResetCodeDTO };
