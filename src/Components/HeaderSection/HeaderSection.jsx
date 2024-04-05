import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SearchBar from "./SearchBar";
import CartInfo from "./CartInfo";

const HeaderSection = () => {
  const renderHeaderContent = () => (
    <Stack direction="row" alignItems="center" gap={2}>
      <img
        src="./MD.png"
        alt="Logo"
        style={{ width: "50px", transition: "transform 2s", cursor: "pointer" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "rotateY(360deg)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "rotateY(0deg)"; }}
      />
      <SearchBar />
      <CartInfo />
    </Stack>
  );
  

  return (
    <Box component="header" py={3}>
      <Container maxWidth="lg">
        {renderHeaderContent()}
      </Container>
    </Box>
  );
};

export default HeaderSection;
