import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Purchase = sequelize.define("Purchase", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  supplier_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: "supplier", // table name for roles
        key: "id",
      },
  },

  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  order_tax: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  shipping: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  total_cost: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
  created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
  },
},
{
    tableName: "purchase",
    timestamps: true,
    paranoid : true
  });

export default Purchase;
