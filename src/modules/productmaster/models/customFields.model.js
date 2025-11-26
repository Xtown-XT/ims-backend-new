import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const CustomFields = sequelize.define("CustomFields", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

  product_id: { 
    type: DataTypes.UUID,
    allowNull: false,
     references: {
        model: "productInfo",
        key: "id",
      },
   },

  warranty_id: { type: DataTypes.UUID, allowNull: false ,
     references: {
        model: "warranties",
        key: "id",
      },
  },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  manufactured_date: { type: DataTypes.DATE, allowNull: false },
  expiry_on: { type: DataTypes.DATE, allowNull: false },
 is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},{
   tableName: "customFields",
    timestamps: true,
    paranoid: true,
}

);

export default CustomFields;
