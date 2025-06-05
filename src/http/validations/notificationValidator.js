import { z } from 'zod';

export const createNotificationSchema = z
  .object({
    user_id: z.number({
      required_error: 'User ID is required.',
      invalid_type_error: 'User ID must be a number.',
    }),
    recharge_id: z
      .string()
      .uuid('Recharge ID must be a valid UUID.')
      .optional(),
    expense_id: z
      .number({
        invalid_type_error: 'Expense ID must be a number.',
      })
      .optional(),
  })
  .refine((data) => data.recharge_id || data.expense_id, {
    message: 'Either rechargeId or expenseId must be provided.',
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
