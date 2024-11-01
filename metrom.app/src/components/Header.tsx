import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value (50) to change when the background appears
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        padding: "1rem",
        zIndex: 1000,
        backgroundColor: isScrolled
          ? "rgba(170, 170, 170, 0.1)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(4px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "none",
        boxShadow: isScrolled ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
        transition: "all 0.3s ease-in-out",
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Logo"
          style={{ height: "40px" }}
        />

        <Stack direction="row" spacing={4}>
          <button onClick={() => scrollToSection("hero")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("products")}>Products</button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
