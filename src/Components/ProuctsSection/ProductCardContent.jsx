import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ProductCardContent = ({ name, price: productPrice, salePrice }) => {
  const formattedProductPrice = parseFloat(productPrice).toFixed(2);
  const formattedSalePrice = salePrice ? parseFloat(salePrice).toFixed(2) : null;

  const renderOriginalPrice = () => {
    if (!formattedSalePrice) return null;
    return (
      <Typography component="span" variant="body2" color="text.secondary">
        EGP {formattedProductPrice}
      </Typography>
    );
  };

  const renderSalePrice = () => {
    if (!formattedSalePrice) return null;
    return (
      <Typography component="span" color="error">
        EGP {formattedSalePrice}
      </Typography>
    );
  };

  return (
    <CardContent>
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body2">
        {renderOriginalPrice()}
        <Typography component="span" color="primary">
          {renderSalePrice()}
        </Typography>
      </Typography>
    </CardContent>
  );
};

export default ProductCardContent;
