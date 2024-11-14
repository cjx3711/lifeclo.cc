import { Box, Stack, styled } from "@mui/system";
import ContactSection from "./components/ContactSection";
import FeaturesSection from "./components/FeaturesSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductSection";

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
  return (
    <MetroGridBackground>
      <Header />
      <Stack
        spacing={8}
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <ContactSection />
        <Box sx={{ height: "100px" }} />
      </Stack>
    </MetroGridBackground>
  );
}

export default App;
