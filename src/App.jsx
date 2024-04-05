import ThemeProvider from "./Theme/ThemeProvider";
import { ProductsProvider } from "./context/Providers/ProductsProvider";
import { CartProvider } from "./context/Providers/CartProvider";
import HeaderSection from "./Components/HeaderSection/HeaderSection";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "./Components/Breadcrumbs";
import ProductsRenderHandler from "./Components/ProductsHandellers/ProductsRenderHandler";

const renderBreadcrumbs = () => (
  <Breadcrumbs />
);

// Render the heading for the products
const renderTypography = () => (
  <Typography variant="h4" component="h2" mb={2}>
    جميع أصناف الحلويات
  </Typography>
);

// Render the products controller component
const renderProductsController = () => (
  <ProductsRenderHandler />
);

// Render the main content of the app
const renderMainContent = () => (
  <>
    {renderBreadcrumbs()}
    {renderTypography()}
    {renderProductsController()}
  </>
);

// Main App component
const App = () => (
  <ThemeProvider>
    <CartProvider>
      <ProductsProvider>
        <HeaderSection />
        <main id="app">
          <Container maxWidth="lg">
            {renderMainContent()}
          </Container>
        </main>
      </ProductsProvider>
    </CartProvider>
  </ThemeProvider>
);

export default App;
