import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    expense: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "expense_categories",
        key: "id",
      },
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Paid", "Pending", "Draft"),
      defaultValue: "Pending",
      allowNull: false,
    },
     is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},
  {
    tableName: "expenses",
    timestamps: true,
    paranoid: true,
    
  }
);



export default Expense;
