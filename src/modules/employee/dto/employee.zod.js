import { z } from "zod";

export const createEmployeeSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\-() ]+$/, "Invalid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),

    // Confirm password (only for validation, not stored)
    confirm_password: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),

    role_id: z.string().uuid("Invalid role ID").optional(),
    profile_picture: z.string().optional(),
    is_active: z.boolean().default(true),
    created_by: z.string().uuid("Invalid creator ID"),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z
      .string()
      .regex(/^[0-9+\-() ]+$/, "Invalid phone number")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    role_id: z.string().uuid("Invalid role ID").optional(),
    profile_picture: z.string().optional(),
    is_active: z.boolean().optional(),
    updated_by: z.string().uuid("Invalid updater ID").optional(),
  }),
});

export const idSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid employee ID"),
  }),
});
