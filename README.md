Mitch Online Store

Description:
Mitch Online Store is a responsive web application designed to facilitate online shopping by providing users with an intuitive interface to browse, filter, and purchase products. The app features a range of functionalities including filtering products by category, loading more products dynamically, searching for products, and adding items to the shopping cart.

## Technologies:

* React.js
* React Router
* React Context API
* Material UI
* CSS Module
* Axios
* React Icons
* React Spinners
* React Toastify
* React Paginate
* React Infinite Scroller

## Features:

1- Filter Products by Category:
* Users can easily filter products based on different categories, This feature enhances user experience by allowing them to quickly find products of interest.

2- Load More Products:
 * Mitch Online Store incorporates a 'Load More' functionality which dynamically fetches additional products as the user scrolls through the catalog. This ensures a seamless browsing experience without overwhelming the user with excessive content all at once.

3- Add to Cart:
* The 'Add to Cart' feature enables users to add desired products to their shopping cart with a single click. Users can review and modify their cart contents before proceeding to checkout, providing a convenient shopping experience.

 4- Search Products:
 * Users can search for products by product name in the search field.

5- for UI style I used Material UI and CSS Module


## Important Notes:
- keyword (search) endpoint not working, so I made the search feature only on the client side.
  
- The page endpoint not working, so I'm loading more products from the Products Per_page endpoint, which hassle and a challenge, but handled this situation.
  
- There is no endpoint for fetching product categories, but I worked with this case by generating unique product categories on the client side.
  
- context API is not the best choice for managing the global state in large-scale and complex apps, there a strong tools for  managing the global state such as Redux, and Redux Toolkit, but I chose context API for this app because it's a small app.
