import { z } from 'zod';

export const createGroupParticipantSchema = z.object({
  group_id: z.number({
    required_error: 'Group ID is required.',
    invalid_type_error: 'Group ID must be a number.',
  }),
  user_id: z.number({
    required_error: 'User ID is required.',
    invalid_type_error: 'User ID must be a number.',
  }),
});

export const updateGroupParticipantSchema = z.object({
  id: z.number({
    required_error: 'Participant ID is required.',
    invalid_type_error: 'Participant ID must be a number.',
  }),
  group_id: z.number().optional(),
  user_id: z.number().optional(),
});
