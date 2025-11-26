 import express from "express";
 import  cuponRoutes from "./cupon.routes.js";
 import giftroutes from "./gift.routes.js";
 import adddiscountsroutes from "./adddiscount.routes.js";
 import discoutaddroutes from  "./discountadd.routes.js";

 const router = express.Router();

 router.use("/cupon", cuponRoutes);
 router.use("/gift", giftroutes);
 router.use("/discount", adddiscountsroutes);
 router.use("/adddiscount", discoutaddroutes);
 
 export default router;