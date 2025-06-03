class MeDTO {
  constructor({ id, name, cpf, email, avatar_url, email_verified_at }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.avatar_url = avatar_url;
    this.email_verified_at = email_verified_at;
  }
}

export { MeDTO };
