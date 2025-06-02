export default class CreateGroupDTO {
  constructor({ access_code, name, description, group_owner }) {
    this.name = name;
    this.access_code = access_code;
    this.description = description;
    this.group_owner = group_owner;
  }
}
