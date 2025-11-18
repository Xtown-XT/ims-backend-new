import { z } from "zod";

export const barcodeSchema = z.object({
  text: z
    .string()
    .min(1, "Barcode text cannot be empty")
    .optional(), // auto-generate allowed

  type: z
    .string()
    .default("code128")
    .refine(
      (val) =>
        ["code128", "code39", "qrcode", "ean13", "ean8"].includes(val),
      "Invalid barcode type"
    ),

  scale: z.coerce
    .number()
    .int()
    .min(1, "Scale must be at least 1")
    .max(10, "Scale too large")
    .default(3),

  height: z.coerce
    .number()
    .int()
    .min(10, "Height must be at least 10")
    .max(100, "Height too large")
    .default(10),

  includetext: z.union([z.boolean(), z.string()]).default(true),

  textxalign: z
    .string()
    .default("center")
    .refine(
      (val) => ["center", "left", "right"].includes(val),
      "textxalign must be center / left / right"
    ),
});
