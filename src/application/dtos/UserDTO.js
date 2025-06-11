export default class UserDTO {
  constructor({
    id,
    name,
    cpf,
    birth_date,
    email,
    phone,
    avatar_url,
    email_verified_at,
    last_login_at,
    desactivated_at,
    created_at,
    update_at,
  }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.birth_date = birth_date;
    this.email = email;
    this.phone = phone;
    this.avatar_url = avatar_url;
    this.email_verified_at = email_verified_at;
    this.last_login_at = last_login_at;
    this.desactivated_at = desactivated_at;
    this.created_at = created_at;
    this.update_at = update_at;
  }
}
