import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Barcode = sequelize.define(
  "Barcode",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "code128", // FIXED
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "barcodes",
    timestamps: true,
    paranoid: true, // FIXED
  }
);

export default Barcode;
