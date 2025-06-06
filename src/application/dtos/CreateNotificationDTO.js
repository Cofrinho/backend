export default class CreateNotificationDTO {
  constructor({ user_id, type, reference_id }) {
    this.user_id = user_id;
    this.type = type;
    this.reference_id = reference_id;
  }
}
