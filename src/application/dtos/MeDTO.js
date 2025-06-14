class MeDTO {
  constructor({
    id,
    name,
    cpf,
    birth_date,
    email,
    phone,
    avatar_url,
    email_verified_at,
  }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.birth_date = birth_date;
    this.email = email;
    this.phone = phone;
    this.avatar_url = avatar_url;
    this.email_verified_at = email_verified_at;
  }
}

export { MeDTO };
