import { z } from "zod";

export const warehouseSchema = z.object({
   warehouse_name: z
    .string({ required_error: "Warehouse name is required" })
    .min(2, "Warehouse name must be at least 2 characters long"),

  Contact_person: z
    .string({ required_error: "Contact person is required" })
    .min(2, "Contact person must be at least 2 characters long"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  phone_work: z
    .string({ required_error: "Work phone number is required" })
    .regex(/^[0-9]{10}$/, "Work phone number must be 10 digits"),

  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address must be at least 5 characters long"),

  city: z
    .string({ required_error: "City is required" })
    .min(2, "City must be at least 2 characters long"),

  state: z
    .string({ required_error: "State is required" })
    .min(2, "State must be at least 2 characters long"),

  country: z
    .string({ required_error: "Country is required" })
    .min(2, "Country must be at least 2 characters long"),
});

/* ----------------------------------------------------
 ✅ 2. ID Param Validation (used for GET / UPDATE / DELETE)
---------------------------------------------------- */
export const warehouseIdParamSchema = z.object({
  id: z
    .string({ required_error: "Warehouse ID is required" })
    .uuid({ message: "Invalid warehouse ID format (must be UUID)" }),
});

/* ----------------------------------------------------
 ✅ 3. UPDATE Warehouse by ID Validation
---------------------------------------------------- */
// All fields optional during update (partial)
export const warehouseUpdateSchema = warehouseSchema.partial();

/* ----------------------------------------------------
 ✅ 4. DELETE Warehouse by ID Validation
---------------------------------------------------- */
// Reuse warehouseIdParamSchema for ID validation during delete
export const warehouseDeleteSchema = warehouseIdParamSchema;

/* ----------------------------------------------------
 ✅ 5. GET Warehouse by ID Validation (optional)
---------------------------------------------------- */
export const warehouseGetSchema = warehouseIdParamSchema;