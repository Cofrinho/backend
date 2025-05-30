class ReactivateUserDTO {
  constructor({
    id,
    name,
    cpf,
    birth_date,
    email,
    phone,
    avatar_url,
    password,
  }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.birth_date = birth_date;
    this.email = email;
    this.phone = phone;
    this.avatar_url = avatar_url ?? undefined;
    this.password = password;
  }
}

export { ReactivateUserDTO };
