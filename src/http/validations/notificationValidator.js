import { z } from 'zod';

export const createNotificationSchema = z.object({
  user_id: z.number({
    required_error: 'User ID is required.',
    invalid_type_error: 'User ID must be a number.',
  }),
  type: z.enum(['TRANSACTION', 'RECHARGE', 'PAYMENT'], {
    required_error: 'Type is required.',
    invalid_type_error: 'Type must be one of: TRANSACTION, RECHARGE, PAYMENT.',
  }),
  reference_id: z.string().uuid('Reference ID must be a valid UUID.'),
});

export const markAsSeenSchema = z.object({
  id: z.string().uuid('ID must be a valid UUID.'),
});

export const userIdParamSchema = z.object({
  user_id: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: 'User ID is required.',
      invalid_type_error: 'User ID must be a number.',
    }),
  ),
});
