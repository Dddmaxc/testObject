import { z } from "zod";

export const productFormSchema = z
  .object({
    title: z.string().min(1, "Название обязательно"),
    serialNumber: z.number().min(100, "Минимум 3 цифры (например, 100)"),
    isNew: z.union([z.literal(0), z.literal(1)]),
    photo: z.string().url("Неверный формат ссылки на изображение"),
    type: z.string().optional(),
    specification: z.string().optional(),
    status: z.union([z.literal(0), z.literal(1)]),
    guarantee: z.object({
      start: z.string(),
      end: z.string(),
    }),
    price: z
      .array(
        z.object({
          value: z.number().min(0.01, "Цена должна быть больше 0"),
          symbol: z.string(),
          isDefault: z.union([z.literal(0), z.literal(1)]),
        })
      )
      .length(2, "Должно быть две валюты: USD и UAH"),
    name: z.string().min(3, "Имя должно содержать минимум 3 символа"),
  })
  .refine(
    (data) => new Date(data.guarantee.end) > new Date(data.guarantee.start),
    {
      path: ["guarantee", "end"],
      message: "Дата окончания должна быть позже даты начала",
    }
  );

export type ProductFormData = z.infer<typeof productFormSchema>;
