// export const generateSlug = (text) => {
//   return text
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^\w-]+/g, ""); // remove special chars
// };


import slugify from "slugify";
import ProductInfo from "../modules/productmaster/models/productInfo.model.js";
import { Op } from "sequelize";

export const generateSlug = async (productName) => {
  const baseSlug = slugify(productName, { lower: true, strict: true });

  // Find all slugs starting with baseSlug
  const existingSlugs = await ProductInfo.findAll({
    where: {
      slug: {
        [Op.like]: `${baseSlug}%`
      }
    },
    attributes: ["slug"]
  });

  if (existingSlugs.length === 0) {
    return baseSlug; // no duplicates
  }

  // Extract numbers at the end of similar slugs
  let maxNumber = 1;

  existingSlugs.forEach((row) => {
    const slug = row.slug;

    // Matches slugs ending with "-number"
    const match = slug.match(/-(\d+)$/);

    if (match) {
      const number = parseInt(match[1]);
      if (number >= maxNumber) maxNumber = number + 1;
    } else {
      // baseSlug itself exists → next slug should be -2
      if (maxNumber === 1) maxNumber = 2;
    }
  });

  return `${baseSlug}-${maxNumber}`;
};
