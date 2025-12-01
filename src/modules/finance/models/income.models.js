import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const AddIncome = sequelize.define(
  "AddIncome",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    // date of the income (use DATEONLY if you only need date)
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    // FK to income_categories table
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "income_categories", // must match your table name
        key: "id",
      },
    },

    // FK to stores table
    store_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "store", // must match your table name (change if different)
        key: "id",
      },
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("Paid", "Pending", "Draft"),
      defaultValue: "Pending",
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "addincome",
    timestamps: true,
    paranoid: true,
  }
);

export default AddIncome;
