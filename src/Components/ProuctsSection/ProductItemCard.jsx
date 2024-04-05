import React from 'react';
import { useCart } from '../../context/Providers/CartProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import ProductCardContent from './ProductCardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import IconToZoom from '../UIComponents/IconToZoom';
import { notification } from '../../Utilities/Utilities';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const ProductItemCard = React.memo(({ product }) => {
  const { addToCart } = useCart();
  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const { id, main_image, ar_name, price, sale_price, availability } = product || {};

  const isAvailable = availability?.toLowerCase() === 'instock';
  const imageSrc = main_image || './image-placeholder.jpg';

  const addToCartHandler = React.useCallback(() => {
    if (!isAvailable) {
      notification('Out of Stock');
      return;
    }
    if (!product || !id) {
      return;
    }
    addToCart({ ...product, id });
    notification('success', 'تم إضافة المنتج إلى السلة');
  }, [isAvailable, product, id, addToCart]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderZoomButton = () => (
    <button className="outlined-btn circle zoom-btn" onClick={handleOpen}>
      <IconToZoom />
    </button>
  );

  const renderCardActions = () => (
    <CardActions sx={{ gap: 1 }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          justifyContent: !isMobileScreen ? 'flex-start' : 'center',
        }}
        onClick={addToCartHandler}
        disabled={!isAvailable}
      >
        {isAvailable ? 'إضافة إلى السلة' : 'نفذت الكمية'}
      </Button>
      <IconButton>
        <FavoriteIcon fontSize="small" sx={{ fill: '#163300' }} />
      </IconButton>
    </CardActions>
  );

  return (
    product && (
      <Card>
        <Box className="card-header">
          <img src={imageSrc} alt={ar_name || ''} />
          {renderZoomButton()}
        </Box>
        <ProductCardContent name={ar_name || ''} price={price || 0} salePrice={sale_price || 0} />
        {renderCardActions()}
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <img src={imageSrc} alt={ar_name || ''} />
          </DialogContent>
        </Dialog>
      </Card>
    )
  );
});

export default ProductItemCard;
