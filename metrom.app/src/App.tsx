import { Stack, Box, styled } from "@mui/system";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductSection";

const MetroGridBackground = styled(Box)({
  background: `
    linear-gradient(90deg, #FFFFFF22 1px, transparent 1px),
    linear-gradient(180deg, #FFFFFF22 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
  backgroundColor: "#00341D",
});

function App() {
  return (
    <MetroGridBackground sx={{ minHeight: "100vh" }}>
      <Header />
      <Stack
        spacing={8}
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <HeroSection />
        <AboutSection />
        <ProductsSection />

        <Box sx={{ height: "400px" }} />
      </Stack>
    </MetroGridBackground>
  );
}

export default App;
