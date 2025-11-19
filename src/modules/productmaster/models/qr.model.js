// src/modules/productmaster/models/qr.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const QRCodeModel = sequelize.define(
  "QRCode",
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
      defaultValue: "qrcode",
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "qrcodes",
    timestamps: true,
    paranoid: true,
  }
);

export default QRCodeModel;
