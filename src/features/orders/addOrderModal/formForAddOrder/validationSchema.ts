import { z } from "zod";

export const formOrderSchema = z.object({
  title: z.string().min(3, "Заголовок должен быть не менее 3 символов"),
  description: z.string().min(5, "Описание должно быть не менее 5 символов"),
});

export type OrderFormData = z.infer<typeof formOrderSchema>;