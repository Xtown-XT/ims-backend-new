import { DataTypes } from "sequelize";
import {sequelize} from "../../../db/index.js";

const Unit = sequelize.define(
  "Unit",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    unit_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: "Full name of the unit (e.g., Kilogram, Liter)",
    },

    short_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: "Short code for the unit (e.g., kg, L, pcs)",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "Status of the unit (active/inactive)",
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
    tableName: "units",
    timestamps: true, // adds created_at & updated_at
    paranoid: true, // enables soft delete
    underscored: true, // uses snake_case columns
  }
);

export default Unit;
