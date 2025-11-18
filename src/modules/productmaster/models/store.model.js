import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Store = sequelize.define(
  "Store",
  {
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
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
    timestamps: true, // ✅ adds createdAt and updatedAt
    tableName: "store", // ✅ custom table name
    paranoid: true, // ✅ enables soft delete (adds deletedAt column)
  }
);

export default Store;
