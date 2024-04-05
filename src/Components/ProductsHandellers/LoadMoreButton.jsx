import { useProducts } from "../../context/Providers/ProductsProvider";
import { useHttp } from "../../Hooks/useHttp";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NUM_OF_LOADING = 12;

const LoadMoreButton = () => {
  const {
    category,
    productsSearchQuery,
    products_per_page,
    isLoading,
    currentProductsCount,
    disableUserActions,
    dispatch,
  } = useProducts();

  const { isLoading: isLoadMore, error, performRequest } = useHttp();
  const [canLoadMore, setCanLoadMore] = useState(true);

  const loadMoreHandler = () => {
    const payload = {
      category,
      products_per_page: products_per_page + NUM_OF_LOADING,
    };

    performRequest({ body: payload }, handleProductsResult);
  };

  const handleProductsResult = (productsResult) => {
    const loadedProductsCount = productsResult.length;

    if (loadedProductsCount === currentProductsCount) {
      setCanLoadMore(false);
      return;
    }

    if (loadedProductsCount % NUM_OF_LOADING > 0) {
      dispatch({
        type: "LOAD_MORE_PRODUCTS",
        payload: productsResult.slice(NUM_OF_LOADING),
      });

      setCanLoadMore(false);
    } else {
      dispatch({
        type: "LOAD_MORE_PRODUCTS",
        payload: productsResult.slice(products_per_page),
      });
    }
  };

  const handleLoadMoreButton = () => {
    if (currentProductsCount === 0) return;

    if (currentProductsCount < NUM_OF_LOADING && productsSearchQuery === "") {
      setCanLoadMore(false);
    } else {
      setCanLoadMore(true);
    }
  };

  useEffect(() => {
    handleLoadMoreButton();
  }, [currentProductsCount, productsSearchQuery]);

  const requireToDisable =
    isLoadMore || isLoading || !canLoadMore || disableUserActions;

  const renderLoadMoreButton = () => (
    <button
      className="btn outlined-btn load-more"
      aria-roledescription="load-products"
      disabled={requireToDisable}
      onClick={loadMoreHandler}
    >
      {!isLoadMore ? "عرض المزيد" : "جاري التحميل"}
    </button>
  );

  return (
    <Box textAlign="center" mt={5}>
      {renderLoadMoreButton()}
      {!canLoadMore && (
        <Typography variant="h6" pt={1}>
          لا يوجد نتايج أخرى للعرض
        </Typography>
      )}
      {error && <Typography variant="h6">{error}</Typography>}
    </Box>
  );
};

export default LoadMoreButton;
