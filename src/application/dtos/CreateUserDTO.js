class CreateUserDTO {
  constructor({ name, cpf, birth_date, email, phone, password }) {
    this.name = name;
    this.cpf = cpf;
    this.birth_date = birth_date;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

export { CreateUserDTO };
