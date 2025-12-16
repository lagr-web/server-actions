import { z } from 'zod';

export const nameDataSchema = z.object({
  name: z.string().trim().min(1, "Fornavn er påkrævet."),
  lastname: z.string().trim().min(1, "Efternavn er påkrævet."),
});

// TypeScript type udledt fra skemaet
export type NameData = z.infer<typeof nameDataSchema>;