import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Warranty = sequelize.define("Warranty", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  warranty_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  period: {
    type: DataTypes.ENUM("Days", "Months", "Years"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "warranties",
  timestamps: true,
   paranoid : true,
    deletedAt: "deleted_at",       // custom delete column name
    updatedAt: "updated_at",       // custom updated column name
  
});

export default Warranty;
