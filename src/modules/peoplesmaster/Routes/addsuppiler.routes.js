import express from "express";
import addsupplierController from "../controllers/add.supplier.js";

import { uploadSingle } from "../../../middleware/upload.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";

// ⭐ Correct Supplier Zod Schemas
import {
  createSupplierSchema,
  updateSupplierSchema,
  deleteSupplierSchema,
  idParamSchema,
  getAllSupplierQuerySchema
} from "../dto/addsuplier.zod.js";

const router = express.Router();


/* -------------------------------------------------
   CREATE SUPPLIER
------------------------------------------------- */
router.post(
  "/createsupplier",
  verifyEmployeeToken,
  uploadSingle("image", "suppliers"),
  validate({ body: createSupplierSchema }),
  addsupplierController.createsupplier
);


/* -------------------------------------------------
   GET ALL SUPPLIERS
------------------------------------------------- */
router.get(
  "/getAllSuppliers",
  verifyEmployeeToken,
  validate({ query: getAllSupplierQuerySchema }),
  addsupplierController.getAllSuppliers
);


/* -------------------------------------------------
   UPDATE SUPPLIER BY ID
------------------------------------------------- */
router.put(
  "/updateSupplierById/:id",
  verifyEmployeeToken,
  uploadSingle("image", "suppliers"),
  validate({ params: idParamSchema, body: updateSupplierSchema }),
  addsupplierController.updateSupplierById
);


/* -------------------------------------------------
   GET SUPPLIER BY ID
------------------------------------------------- */
router.get(
  "/getSupplierById/:id",
  verifyEmployeeToken,
  validate({ params: idParamSchema }),
  addsupplierController.getSupplierById
);


/* -------------------------------------------------
   DELETE SUPPLIER BY ID
------------------------------------------------- */
router.delete(
  "/deleteSupplierById/:id",
  verifyEmployeeToken,
  validate({ params: deleteSupplierSchema }),
  addsupplierController.deleteSupplierById
);


export default router;
