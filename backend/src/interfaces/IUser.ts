import { z } from 'zod';

const UserSchema = z.object({
  username: z.string({ required_error: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' }),

  password: z.string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
});

export type IUser = z.infer<typeof UserSchema>;
export { UserSchema };
