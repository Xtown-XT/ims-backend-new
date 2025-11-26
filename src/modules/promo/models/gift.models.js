import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
// import Customer from "../../peoplesmaster/models/addcustomers.models.js";

const GiftCard = sequelize.define(
  "gift_cards",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    giftcard_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "customers", 
        key: "id",
      },
    },

    issued_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "gift_cards",
    timestamps: true,
    paranoid: true,
  }
);

export default GiftCard;
