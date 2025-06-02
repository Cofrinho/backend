export default class GroupParticipantDTO {
  constructor({ id, group_id, user_id, deactivated_at }) {
    this.id = id ?? undefined;
    this.group_id = group_id;
    this.user_id = user_id;
    this.deactivated_at = deactivated_at ?? undefined;
  }
}
