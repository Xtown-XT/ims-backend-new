// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Categories = sequelize.define(
//   "Categories",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     category_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//      category_code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     category_slug: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       defaultValue: null,
//     },
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//       allowNull: false,
//     },
//     created_by: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },
//     updated_by: {
//       type: DataTypes.UUID,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "categories",
//     timestamps:true,
//     paraniod: true,
   
//   }
// );

// export default Categories;


import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
 
    category_code: {
      type: DataTypes.STRING(10),
      unique: true,
    },
    category_slug: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  },
  {
    tableName: "categories",
    timestamps: true,
    paranoid: true,
  }
);

// =============================================
// 🔥 BEFORE CREATE HOOK: AUTO GENERATE CATEGORY CODE
// =============================================
Categories.beforeCreate(async (category) => {
  if (!category.category_code && category.category_name) {
    let baseCode = category.category_name.substring(0, 3).toUpperCase();
    let code = baseCode;

    const existing = await Categories.count({
      where: { category_code: code }
    });

    if (existing > 0) {
      code = `${baseCode}${existing + 1}`;
    }

    category.category_code = code;
  }
});

export default Categories;
