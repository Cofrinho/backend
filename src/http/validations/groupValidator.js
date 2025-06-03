import { z } from 'zod';

export const createGroupSchema = z.object({
  access_code: z
    .string()
    .length(4, 'Access code must contain exactly 4 characters.'),
  name: z.string().min(1, 'Group name is required.'),
  description: z.string().optional(),
  group_owner: z.number({
    required_error: 'Group owner ID is required.',
    invalid_type_error: 'Group owner ID must be a number.',
  }),
});

export const updateGroupSchema = z.object({
  id: z.number({
    required_error: 'Group ID is required.',
    invalid_type_error: 'Group ID must be a number.',
  }),
  access_code: z
    .string()
    .length(4, 'Access code must contain exactly 4 characters.')
    .optional(),
  name: z.string().min(1, 'Group name is required.').optional(),
  description: z.string().optional(),
  group_owner: z.number().optional(),
  balance: z
    .number({
      invalid_type_error: 'Balance must be a number',
    })
    .optional(),
});
