import { z } from "zod";

const message = {
  name: {
    empty: "Name must not be empty",
  },
  password: {
    empty: "Password must not be empty",
    minLen: "Password must contain at least 6 characters",
    mismatch: "Password doesn't match",
  },
};

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, message.password.minLen),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1, message.name.empty),
    password: z.string().min(6, message.password.minLen),
    confirmPassword: z.string().min(6, message.password.minLen),
  })
  .refine((check) => check.password === check.confirmPassword, {
    message: message.password.mismatch,
    path: ["confirmPassword"],
  });

export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
