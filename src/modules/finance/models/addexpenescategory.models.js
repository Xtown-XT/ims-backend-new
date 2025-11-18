import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const ExpenseCategory = sequelize.define(
  "ExpenseCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "expense_categories",
    timestamps: true,
    paranoid: true,
  }
);

export default ExpenseCategory;
