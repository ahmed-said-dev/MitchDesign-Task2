import React from "react";
import Stack from "@mui/material/Stack";
import CategoriesStyleList from "./CategoriesList.module.css";
import CancelIcon from "@mui/icons-material/Cancel";

const CategoriesList = ({
  categories,
  selectedProductsCategory,
  loading,
  disableUserActions,
  dispatch,
}) => {
  const handleClick = (category_slug) => {
    dispatch({
      type: "FILTER_PRODUCTS",
      selectedProductsCategory: category_slug,
    });
  };

  const renderCategory = ({ category_slug, category_name_ar }) => {
    const isCategorySelected = selectedProductsCategory === category_slug;
    const isButtonDisabled = loading || disableUserActions;

    const handleClickWrapper = () => {
      if (!isButtonDisabled) {
        handleClick(category_slug);
      }
    };

    return (
      <li key={category_slug}>
        <button
          className={`btn light-bg ${isCategorySelected ? "active" : ""}`}
          onClick={handleClickWrapper}
          disabled={isButtonDisabled}
        >
          {category_name_ar}
          {isCategorySelected && <CancelIcon fontSize="small" />}
        </button>
      </li>
    );
  };

  const renderCategories = () => {
    return categories.map(renderCategory);
  };

  return (
    <Stack component="ul" direction="row" className={CategoriesStyleList["categories-list"]}>
      {renderCategories()}
    </Stack>
  );
};

export default CategoriesList;
