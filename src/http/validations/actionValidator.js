import { z } from 'zod';

export const paramsSchema = z.object({
  action: z.enum(['balance', 'home'], { required_error: 'Action is required', invalid_type_error: 'Action must be a string' })
})
