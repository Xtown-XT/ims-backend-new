// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Store = sequelize.define(
//   "Store",
//   {

//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     store_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//      store_code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { isEmail: true },
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM("active", "inactive"),
//       defaultValue: "active",
//     },
//     created_by: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     updated_by: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true, // ✅ adds createdAt and updatedAt
//     tableName: "store", // ✅ custom table name
//     paranoid: true, // ✅ enables soft delete (adds deletedAt column)
//   }
// );

// export default Store;


import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store_code: {
      type: DataTypes.STRING(10),
      unique: true,
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
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: "store",
    paranoid: true,
  }
);

// =============================================
// 🔥 BEFORE CREATE HOOK: AUTO GENERATE STORE CODE
// =============================================
Store.beforeCreate(async (store) => {
  if (!store.store_code && store.store_name) {
    let baseCode = store.store_name.substring(0, 3).toUpperCase(); // first 3 letters
    let code = baseCode;

    // Check existing codes to avoid duplicates
    const existing = await Store.count({
      where: { store_code: code }
    });

    if (existing > 0) {
      code = `${baseCode}${existing + 1}`;
    }

    store.store_code = code;
  }
});

export default Store;
