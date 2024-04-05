import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const createCustomTheme = () => {
  const baseTheme = createTheme({
    palette: {
      primary: { main: "#163300", dark: "#122900", light: "#185039" },
      secondary: { main: "#EDC843", dark: "#bea036", light: "#f4de8e" },
    },
    typography: {
      htmlFontSize: 11,
      fontFamily: ["Baloo Bhaijaan 2", "Roboto", "sans-serif"].join(","),
    },
  });

  const customThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "unset",
            borderRadius: 100,
            ":hover": { boxShadow: "unset" },
            padding: "8px 10px",
          },
        },
        defaultProps: {
          disableRipple: true,
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "unset",
            border: "2px solid #D9D9D9",
            borderRadius: 20,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#edefeb",
            ":hover": { backgroundColor: "#dedede" },
          },
        },
      },
    },
  };

  const customTheme = responsiveFontSizes(createTheme(baseTheme, customThemeOptions));

  return customTheme;
};

const ThemeProvider = ({ children }) => {
  const theme = createCustomTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;