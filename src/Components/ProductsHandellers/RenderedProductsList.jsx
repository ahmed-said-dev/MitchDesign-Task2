import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductItemCard from "../ProuctsSection/ProductItemCard";

const RenderedProductsList = ({ products }) => {
  const renderProductList = () => {
    if (products.length === 0) {
      return (
        <Typography variant="h6" textAlign="center">
           لا يوجد نتائج بحث لعرضها
        </Typography>
      );
    }

    return (
      <Grid container spacing={2} component="ul">
        {products.map((product) => (
          <Grid key={product.id} item xs={6} md={4} lg={3} component="li">
            <ProductItemCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return <Box>{renderProductList()}</Box>;
};

export default RenderedProductsList;
