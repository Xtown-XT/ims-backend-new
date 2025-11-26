import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const SingleProduct = sequelize.define("SingleProduct", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

  product_id: { 
    type: DataTypes.UUID,
    allowNull: false,
     references: {
        model: "productInfo",
        key: "id",
      },
   },

  quantity: { type: DataTypes.INTEGER, allowNull: false },
  quantity_alert: { type: DataTypes.INTEGER, allowNull: false },

  price: { type: DataTypes.FLOAT, allowNull: false },

  tax_id: { type: DataTypes.UUID, allowNull: false ,
     references: {
        model: "taxes",
        key: "id",
      },
  },
  tax_type: {
    type: DataTypes.ENUM("inclusive", "exclusive"),
    allowNull: false,
  },

  discount_type: {
    type: DataTypes.ENUM("percentage", "fixed"),
    allowNull: false,
  },
  discount_value: { type: DataTypes.FLOAT, allowNull: false },
 is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},{
   tableName: "singleProduct",
    timestamps: true,
    paranoid: true,
}

);

export default SingleProduct;
