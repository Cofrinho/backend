import { z } from 'zod';

const participantSchema = z.object({
  userId: z.number().int().min(1, 'User ID is required.'),
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(1, 'Amount must be greater than 0'),
  percentagePaid: z
    .number({ required_error: 'Percentage paid is required' })
    .min(1, ' Percentage paid must be greater than 0')
    .max(100, ' Percentage paid must be less than 100'),
});
export const createExpenseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional().default(''),
  value: z.number().min(1, 'Value is required'),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'due date must be a valid date in ISO format (yyyy-mm-dd).',
  }),
  participants: z.array(participantSchema).min(1, 'Participants is required'),
});
