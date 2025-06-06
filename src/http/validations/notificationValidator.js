import { z } from 'zod';

export const createNotificationSchema = z.object({
  user_id: z.number().int({
    required_error: 'User ID is required.',
    invalid_type_error: 'User ID must be a number.',
  }),
  type: z.enum(['TRANSACTION', 'RECHARGE', 'PAYMENT', 'EXPENSE'], {
    required_error: 'Type is required.',
    invalid_type_error:
      'Type must be one of: TRANSACTION, RECHARGE, PAYMENT or EXPENSE.',
  }),
  reference_id: z.string('Reference ID must be a TEXT.'),
});

export const markAsSeenSchema = z.object({
  id: z.number().int({
    required_error: 'ID is required.',
    invalid_type_error: 'ID must be a number.',
  }),
});

export const userIdParamSchema = z.object({
  user_id: z.preprocess(
    (val) => Number(val),
    z.number().int({
      required_error: 'User ID is required.',
      invalid_type_error: 'User ID must be a number.',
    }),
  ),
});
