import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,     // You used integer, so keeping same
      primaryKey: true,
      autoIncrement: true,
    },

    expense: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),   // Perfect for money
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Paid", "Pending", "Draft"),
      allowNull: false,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
    paranoid: true,        // 🔥 enables soft delete
    deletedAt: "deleted_at",
  }
);

export default Expense;
