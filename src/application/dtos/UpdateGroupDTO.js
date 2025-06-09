export default class UpdateGroupDTO {
  constructor({
    id,
    access_code,
    name,
    description,
    image_url,
    group_owner,
    balance,
  }) {
    this.id = id;
    this.name = name ?? undefined;
    this.access_code = access_code ?? undefined;
    this.description = description ?? undefined;
    this.image_url = image_url ?? undefined;
    this.group_owner = group_owner ?? undefined;
    this.balance = balance ?? undefined;
  }
}
