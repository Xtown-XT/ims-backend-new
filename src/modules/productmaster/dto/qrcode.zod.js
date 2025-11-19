import { z } from "zod";

// CREATE QR Code Validation
export const createQRSchema = z.object({
  text: z
    .string()
    .trim()
    .optional(),   // text is optional (auto-generated if missing)
});

// UPDATE QR Code Validation
export const updateQRSchema = z.object({
  text: z
    .string()
    .trim()
    .optional(),   // text optional (keep old text if not provided)
});

// ID Validation — good & simple
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
