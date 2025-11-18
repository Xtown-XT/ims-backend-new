import { z } from "zod";

export const createStoreSchema = z.object({
  store_name: z.string().min(1, "Store name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  status: z.enum(["active", "inactive"]).optional(),
});

export const updateStoreSchema = createStoreSchema.partial();

export const storeIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "Store ID must be a number")
    .transform((val) => parseInt(val, 10)),
});
