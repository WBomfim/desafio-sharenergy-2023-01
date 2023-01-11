import { z } from 'zod';

const ClientSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).
    min(3, { message: 'Name must be at least 3 characters' }),

  email: z.string({ required_error: 'Email is required' }).
    email({ message: 'Email must be a valid email' }),

  phone: z.string({ required_error: 'Phone is required' }).
    min(10, { message: 'Phone must be at least 10 characters' }),

  address: z.string({ required_error: 'Address is required' }).
    min(3, { message: 'Address must be at least 3 characters' }),

  cpf: z.string({ required_error: 'CPF is required' }).
    min(11, { message: 'CPF must be at least 11 characters' })
});

export type IClient = z.infer<typeof ClientSchema>;
export { ClientSchema };
