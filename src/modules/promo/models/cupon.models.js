import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import { de } from "zod/v4/locales";

const Cupon = sequelize.define(
  "Cupon",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    cupon_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    type: {
      type: DataTypes.ENUM("fixed", "percentage"),
      allowNull: false,
      defaultValue: "fixed",
    },

    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    limit:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },

    product: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },

  
  {
    tableName: "cupons",
    timestamps: true,
    paranoid: true, 
  }
);

export default Cupon;
