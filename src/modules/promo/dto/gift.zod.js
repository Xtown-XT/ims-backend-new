import { z } from "zod";

/**
 * 🔹 Create Gift Card Validation
 */
export const createGiftCardSchema = z.object({
  body: z.object({
    giftcard_no: z.string().min(1, "Gift card number is required"),
    customer_id: z.string().uuid("Invalid customer ID format"),
    issued_date: z.string().min(1, "Issued date is required"),
    expiry_date: z.string().min(1, "Expiry date is required"),
    amount: z.number().min(0, "Amount must be more than or equal to 0"),
    balance: z.number().min(0, "Balance must be more than or equal to 0"),
    status: z.boolean().optional(),   // default true handled in controller
  }),
});

/**
 * 🔹 Update Gift Card Validation
 */
export const updateGiftCardSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid gift card ID"),
  }),
  body: z.object({
    giftcard_no: z.string().optional(),
    customer_id: z.string().uuid("Invalid customer ID format").optional(),
    issued_date: z.string().optional(),
    expiry_date: z.string().optional(),
    amount: z.number().min(0, "Amount must be >= 0").optional(),
    balance: z.number().min(0, "Balance must be >= 0").optional(),
    status: z.boolean().optional(),
  }),
});

/**
 * 🔹 Get / Delete Gift Card by ID Validation
 */
export const giftCardIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid gift card ID"),
  }),
});


