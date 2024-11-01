import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ja" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
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

        <Stack direction="row" spacing={4} alignItems="center">
          <button onClick={() => scrollToSection("hero")}>
            {t("header.home")}
          </button>
          <button onClick={() => scrollToSection("about")}>
            {t("header.about")}
          </button>
          <button onClick={() => scrollToSection("products")}>
            {t("header.products")}
          </button>
          <button
            onClick={toggleLanguage}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: "#444",
              color: "#fff",
            }}>
            {i18n.language === "en" ? "日本語" : "English"}
          </button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
