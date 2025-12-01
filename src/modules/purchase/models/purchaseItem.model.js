import { DataTypes } from "sequelize";
import { sequelize } from ".././../../db/index.js";

const PurchaseItem = sequelize.define("PurchaseItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  purchase_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: "purchase", // table name for roles
        key: "id",
      },
  },

  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: "productInfo", // table name for roles
        key: "id",
      },
  },

  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  tax_percent: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  tax_amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
unit_price : {
    type: DataTypes.FLOAT,
    defaultValue: 0,
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
    tableName: "purchaseItem",
    timestamps: true,
    paranoid : true
  });

export default PurchaseItem;
