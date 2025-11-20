import express from "express";
import peoplesmasterController from "../controllers/add.customers.js";
import { uploadSingle } from "../../../middleware/upload.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";

import {
  createCustomerSchema,
  deleteCustomerSchema,
  idParamSchema,
  updateCustomerSchema,
} from "../dto/addcustomer.zod.js";

const router = express.Router();

/* -----------------------------
   CREATE CUSTOMER
------------------------------ */
router.post(
  "/createcustomer",
  verifyEmployeeToken,
  uploadSingle("image", "customers"),
  validate({ body: createCustomerSchema }),
  peoplesmasterController.customercreate
);

/* -----------------------------
   GET ALL CUSTOMERS
------------------------------ */
router.get(
  "/getallcustomers",
  verifyEmployeeToken,
  peoplesmasterController.getAllCustomers
);

/* -----------------------------
   UPDATE CUSTOMER BY ID
------------------------------ */
router.put(
  "/updateCustomerById/:id",
  verifyEmployeeToken,
  uploadSingle("image", "customers"),
  validate({ params: idParamSchema, body: updateCustomerSchema }),
  peoplesmasterController.updateCustomerById
);

/* -----------------------------
   GET CUSTOMER BY ID
------------------------------ */
router.get(
  "/getCustomerById/:id",
  verifyEmployeeToken,
  validate({ params: idParamSchema }),
  peoplesmasterController.getCustomerById
);

/* -----------------------------
   DELETE CUSTOMER BY ID
------------------------------ */
router.delete(
  "/deleteCustomerById/:id",
  verifyEmployeeToken,
  validate({ params: deleteCustomerSchema }),
  peoplesmasterController.deleteCustomerById
);

export default router;
