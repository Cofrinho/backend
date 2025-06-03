import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF must contain exactly 11 numeric digits.'),
  birth_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Birth date must be a valid date in ISO format (yyyy-mm-dd).',
  }),
  email: z.string().email('Invalid email address.'),
  phone: z
    .string()
    .regex(
      /^\d{11,}$/,
      'Phone number must contain at least 11 numeric digits.',
    ),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .max(64, 'Password must have a maximum of 64 characters.')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character.',
    }),
});

export const updateUserSchema = z
  .object({
    id: z.number({
      required_error: 'ID is required.',
      invalid_type_error: 'ID must be a number.',
    }),
    name: z.string().min(1, 'Name is required.').optional(),
    cpf: z
      .string()
      .regex(/^\d{11}$/, 'CPF must contain exactly 11 numeric digits.')
      .optional(),
    birth_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Birth date must be a valid date in ISO format (yyyy-mm-dd).',
      })
      .optional(),
    email: z.string().email('Invalid email address.').optional(),
    phone: z
      .string()
      .regex(
        /^\d{11,}$/,
        'Phone number must contain at least 11 numeric digits.',
      )
      .optional(),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters.')
      .max(64, 'Password must have a maximum of 64 characters.')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter.',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one number.',
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: 'Password must contain at least one special character.',
      })
      .optional(),
    new_password: z
      .string()
      .min(8, 'New password must contain at least 8 characters.')
      .max(64, 'New password must have a maximum of 64 characters.')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'New password must contain at least one uppercase letter.',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'New password must contain at least one number.',
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: 'New password must contain at least one special character.',
      })
      .optional(),
    avatar_url: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.new_password && !data.password) return false;
      return true;
    },
    {
      message: 'Current password is required when setting a new password.',
      path: ['password'],
    },
  );

export const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .max(64, 'Password must have a maximum of 64 characters.')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character.',
    }),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must contain at least 8 characters.')
    .max(64, 'Password must have a maximum of 64 characters.')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number.',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character.',
    }),
});
