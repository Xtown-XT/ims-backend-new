import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import isEmail from "validator/lib/isEmail.js"; 

const warehouse = sequelize.define(
  "Warehouse",
  
  {

   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
    warehouse_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Contact_person: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_work: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "warehouse",
    paranoid : true

  }
);

export default warehouse;
