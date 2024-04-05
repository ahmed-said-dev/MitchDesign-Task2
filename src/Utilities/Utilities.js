import { toast } from "react-toastify";

// Map object to store unique categories
const categoryMap = new Map();

// Function to add unique categories to the categoryMap
const addUniqueCategory = (category) => {
  if (!categoryMap.has(category.category_slug)) {
    categoryMap.set(category.category_slug, category);
  }
};

// generate unique categories from an array of items
export const generateCategories = (items) => {
  if (items.length === 0) {
    return [];
  }

  // Iterate through the items array and add unique categories to the categoryMap
  items.forEach(addUniqueCategory);

  const uniqueCategories = [
    {
      category_name_ar: "جميع الحلويات",
      category_slug: "",
    },
   ...categoryMap.values(),
  ];

  return uniqueCategories;
};

// Display a notification
export const notification = (status, message) => {
  toast[status](message, {
    position: "bottom-right",
    autoClose: 3000,
    theme: "colored",
  });
};