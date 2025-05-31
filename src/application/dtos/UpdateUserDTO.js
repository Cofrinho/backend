class UpdateUserDTO {
  constructor({
    id,
    name,
    cpf,
    birth_date,
    email,
    phone,
    avatar_url,
    password,
    new_password,
  }) {
    this.id = id;
    this.name = name ?? undefined;
    this.cpf = cpf ?? undefined;
    this.birth_date = birth_date ?? undefined;
    this.email = email ?? undefined;
    this.phone = phone ?? undefined;
    this.avatar_url = avatar_url ?? undefined;
    this.password = password ?? undefined;
    this.new_password = new_password ?? undefined;
  }
}

export { UpdateUserDTO };
