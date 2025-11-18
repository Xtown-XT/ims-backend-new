import { z } from "zod";

// ⭐ Common Reusable Fields
const expenseName = z
  .string({ required_error: "Expense name is required" })
  .min(1, "Expense name cannot be empty");

const description = z.string().optional();

const category = z
  .string({ required_error: "Category is required" })
  .min(1, "Category cannot be empty");

const date = z
  .string({ required_error: "Date is required" })
  .refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format — use YYYY-MM-DD"
  );

const amount = z
  .preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z
      .number({ invalid_type_error: "Amount must be a number" })
      .positive("Amount must be greater than 0")
  );

const status = z.enum(["Paid", "Pending", "Draft"], {
  required_error: "Status is required",
});

// ⭐ CREATE EXPENSE SCHEMA
export const createExpenseSchema = z.object({
  expense: expenseName,
  description,
  category,
  date,
  amount,
  status,
});

// ⭐ UPDATE EXPENSE SCHEMA
export const updateExpenseSchema = z.object({
  expense: expenseName.optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  date: date.optional(),
  amount: z
    .preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.number().positive()
    )
    .optional(),
  status: status.optional(),
});
