export default class CreateGroupDTO {
  constructor({ access_code, name, description, image_url, group_owner }) {
    this.name = name;
    this.access_code = access_code;
    this.description = description;
    this.image_url = image_url;
    this.group_owner = group_owner;
  }
}
