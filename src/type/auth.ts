import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export const signUpSchema = z.object({
  email: z.string().nonempty(),
  name: z.string().nonempty(),
  password: z.string().min(6).nonempty(),
  confirmPassword: z.string().min(6).nonempty(),
});
