// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Variant = sequelize.define(
//   "Variant",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//     variant_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//        unique : true,
//       validate: {
//         notEmpty: { msg: "Variant name is required" },
//       },
//     },

//     values: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       unique : true,
//       /**
//        * Store comma-separated values like "Red,Blue,Green"
//        * Return them as array ["Red","Blue","Green"]
//        */
//       get() {
//         const rawValue = this.getDataValue("values");
//         return rawValue ? rawValue.split(",").map(v => v.trim()) : [];
//       },
//       set(valueArray) {
//         if (Array.isArray(valueArray)) {
//           this.setDataValue("values", valueArray.join(","));
//         } else if (typeof valueArray === "string") {
//           this.setDataValue("values", valueArray);
//         } else {
//           throw new Error("Values must be a string or an array");
//         }
//       },
//     },

//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   },
//   {
//     tableName: "variants",
//     timestamps: true, // Adds createdAt, updatedAt
//     underscored: true, // uses snake_case columns (optional)
//   }
// );

// export default Variant;


// Variant model
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    variant_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Variant name is required" },
      },
    },

    variant_value: {
      type: DataTypes.STRING, // Changed from TEXT -> STRING
      allowNull: false,
      unique: true, // now valid
      get() {
        const rawValue = this.getDataValue("variant_value");
        return rawValue ? rawValue.split(",").map(v => v.trim()) : [];
      },
      set(valueArray) {
        if (Array.isArray(valueArray)) {
          this.setDataValue("variant_value", valueArray.join(","));
        } else if (typeof valueArray === "string") {
          this.setDataValue("variant_value", valueArray);
        } else {
          throw new Error("Values must be a string or an array");
        }
      },
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "variants",
    timestamps: true,
    underscored: true,
  }
);

export default Variant;
