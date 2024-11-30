import { Box, Stack, styled } from "@mui/system";
import ContactSection from "./components/ContactSection";
import FeaturesSection from "./components/FeaturesSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductSection";
import { useTranslation } from "react-i18next";

const MetroGridBackground = styled(Box)({
  background: `
    linear-gradient(90deg, #FFFFFF22 1px, transparent 1px),
    linear-gradient(180deg, #FFFFFF22 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
  backgroundColor: "#00341D",
  minHeight: "100vh",
});

function App() {
  const { t } = useTranslation();
  return (
    <MetroGridBackground>
      <Header />
      <Stack
        spacing={8}
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <HeroSection />
        <FeaturesSection />

        <Stack
          className="shop-section"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ height: "40vh" }}>
          <Box
            id="shop"
            component="a"
            href="https://ko-fi.com/cjx3711/shop"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              width: "fit-content",
              margin: "0 auto",
              padding: "1rem 5rem",
              backgroundColor: "#D9AD68",
              color: "#00341D",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#E5BD82",
                transform: "scale(1.05)",
              },
            }}>
            {t("shop.title")}
          </Box>
        </Stack>
        <ProductsSection />
        <ContactSection />
        <Box sx={{ height: "100px" }} />
      </Stack>
    </MetroGridBackground>
  );
}

export default App;
