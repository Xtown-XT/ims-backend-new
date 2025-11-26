import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const VariantProduct = sequelize.define("VariantProduct", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

  product_id: { 
    type: DataTypes.UUID,
    allowNull: false,
     references: {
        model: "productInfo",
        key: "id",
      },
   },

  attribute_name: { type: DataTypes.STRING, allowNull: false },
  attribute_value: { type: DataTypes.STRING, allowNull: false },

  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},{
   tableName: "variantProduct",
    timestamps: true,
    paranoid: true,
});

export default VariantProduct;
