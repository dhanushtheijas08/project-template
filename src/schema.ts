import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" })
    .min(3, { message: "Email must containes 3 characters" })
    .max(255, { message: "Email must be less than 255 characters" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must containes 6 characters" })
    .max(255, { message: "Password must be less than 255 characters" })
    .trim(),
});

export const userTypeSchema = z.literal("admin").or(z.literal("user"));

export const editUserSchema = authSchema
  .omit({ password: true })
  .extend({ role: userTypeSchema });

export const todoSchema = z.object({
  userId: z.string({ required_error: "User id is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must containes 3 characters" })
    .max(255, { message: "Title must be less than 255 characters" })
    .trim(),
  status: z.enum(["completed", "in-progress", "not-started"]),
});
