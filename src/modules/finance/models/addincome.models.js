import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Income = sequelize.define(
  "income_categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      // autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: "income_categories",
    timestamps: true,
    paranoid: true,
  }
);

export default Income;
