import React from "react";
import { useProducts } from "../../context/Providers/ProductsProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoriesList from "../CategoriesList/CategoriesList";
import RenderedProductsList from "./RenderedProductsList";
import Loading from "../UIComponents/Loading";
import LoadMoreButton from "./LoadMoreButton";

const ProductsRenderHandler = () => {
  const {
    isLoading,
    error,
    products,
    categories,
    category,
    disableUserActions,
    dispatch,
  } = useProducts();

  const renderError = () => {
    if (error) {
      return <Typography textAlign="center">{error}</Typography>;
    }
    return null;
  };

  const renderCategoriesList = () => {
    return (
      <CategoriesList
        categories={categories}
        selectedProductsCategory={category}
        loading={isLoading}
        disableUserActions={disableUserActions}
        dispatch={dispatch}
      />
    );
  };

  const renderProductList = () => {
    if (!isLoading) {
      return <RenderedProductsList products={products} />;
    }
    return null;
  };

  const renderLoading = () => {
    if (isLoading) {
      return <Loading />;
    }
    return null;
  };

  return (
    <Box pb={5}>
      {renderError()}
      {renderCategoriesList()}
      {renderProductList()}
      {renderLoading()}
      <LoadMoreButton />
    </Box>
  );
};

export default ProductsRenderHandler;
