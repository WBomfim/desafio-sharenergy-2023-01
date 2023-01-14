import { z } from 'zod';

const UserIntegrationSchema = z.object({
  fullName: z.string(),
  age: z.number(),
  email: z.string(),
  username: z.string(),
  picture: z.string()
});

export type IUserIntegration = z.infer<typeof UserIntegrationSchema>;
export { UserIntegrationSchema };
