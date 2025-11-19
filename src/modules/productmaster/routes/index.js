import express from "express";
import CategoriesRoutes  from './categories.routes.js';
import SubcategoriesRoutes  from './subcategory.routes.js';
import UnitRoutes from './unit.route.js';
import storeRoutes from "./store.routes.js";
import BrandRoutes from './brand.routes.js';
import taxRoutes from './tax.routes.js';
import varrientRoutes from './varrient.routes.js';
import warehouseRoutes from './warehouse.routes.js';
import WarrantyRoutes from './warrenty.routes.js';
import BarcodeRoutes from "./barcode.routes.js";
import qrcodeRoutes from "./qr.routes.js";

const router = express.Router();

router.use('/categories', CategoriesRoutes);
router.use('/subcategories', SubcategoriesRoutes); 
router.use('/unit', UnitRoutes);
router.use('/store',storeRoutes);
router.use('/brands',BrandRoutes) 
router.use('/tax', taxRoutes);
router.use("/varrient", varrientRoutes);
router.use("/warehouse", warehouseRoutes);
router.use("/warranty", WarrantyRoutes);
router.use("/barcode", BarcodeRoutes);
router.use("/qrcode", qrcodeRoutes);

export default router;