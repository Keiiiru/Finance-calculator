import * as z from "zod";

export const UserFeature = z.object({
  username: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Za-z]/, "Пароль должен содержать хотя бы одну букву")
    .regex(/\d/, "Пароль должен содержать хотя бы одну цифру"),
});
