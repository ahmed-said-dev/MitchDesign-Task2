import React, { useCallback } from "react";
import { useCart } from "../../context/Providers/CartProvider";
import CartInfoStyle from "./CartInfo.module.css";

const CartInfo = () => {
  const { totalCartItems, addToCart } = useCart();

  const handleClick = useCallback(async () => {
    if (addToCart) {
      await addToCart();
    }
  }, [addToCart]);

  const renderBadge = () => {
    if (totalCartItems !== null) {
      return (
        <span className={`circle ${CartInfoStyle.bdge}`} aria-label={`${totalCartItems} item(s) in cart`}>
          {totalCartItems}
        </span>
      );
    }
    return null;
  };

  const renderCartButton = () => (
    <button
      className={`circle ${CartInfoStyle["cart-button"]}`}
      onClick={handleClick}
      aria-label="Go to cart"
    >
      {renderBadge()}
      <svg viewBox="0 0 34 32" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M33.3785 2.22593L26.0655 8.69061H34V14.223C34 16.0585 32.9168 17.6344 31.3551 18.2746L30.3405 28.0934C30.1125 30.3194 28.3254 32 26.184 32H7.78243C5.6411 32 3.85839 30.3194 0 14.223V8.69061H18.295C17.0966 9.70507 16.8474 9.93463 16.4614 10.2902C16.1822 10.5474 15.8314 10.8705 14.9981 11.6043H2.78689V14.223C2.78689 14.9705 3.32102 15.5882 4.0411 15.6592L5.16594 15.7715L6.39663 27.7827C6.47282 28.5248 7.06882 29.0863 7.78243 29.0863H26.1841C26.8977 29.0863 27.4957 28.5248 27.5719 27.7827L28.8047 15.7706L29.9421 15.6588C30.6623 15.5876 31.2131 14.9705 31.2131 14.223V11.6043H22.7689C21.7128 12.5375 20.8758 13.2832 20.207 13.8789L20.2066 13.8793C17.9571 15.8833 17.6112 16.1914 17.2327 16.2388C17.164 16.2474 17.0941 16.2474 17.0116 16.2473H17.0034C16.0792 16.2473 15.4064 15.3212 15.6651 14.3837L15.668 14.3732L15.668 14.3732C15.6863 14.3068 15.7019 14.2501 15.7226 14.1953C15.8435 13.8746 16.1358 13.6186 18.1382 11.8649L18.1382 11.8649L18.1385 11.8647C18.8498 11.2418 19.7768 10.4299 20.9886 9.35901L20.9885 9.35907L23.512 7.12899C24.927 5.87856 26.8359 4.19179 31.5789 0L33.3785 2.22593ZM15.6065 18.597H18.3934V26.7553H15.6065V18.597ZM21.1803 18.597V26.7553H23.9672V18.597H21.1803ZM12.8197 18.597V26.7553H10.0328V18.597H12.8197Z"/>
      </svg>
    </button>
  );

  return renderCartButton();
};

export default CartInfo;
