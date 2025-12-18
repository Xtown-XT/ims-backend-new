import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const ProductImage = sequelize.define("ProductImage", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

 product_id: { 
    type: DataTypes.UUID,
    allowNull: false,
     references: {
        model: "productInfo",
        key: "id",
      },
   },
    varient_product_id: { 
    type: DataTypes.UUID,
    allowNull: true,
     references: {
        model: "variantProduct",
        key: "id",
      },
   },
  image_url: { type: DataTypes.STRING, allowNull: false },

 is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},{
   tableName: "productImage",
    timestamps: true,
    paranoid: true,
}

);

export default ProductImage;
