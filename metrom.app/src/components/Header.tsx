import { Button } from "@mui/base";
import { Box, Stack, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NavButton = styled(Button)({
  padding: "8px 20px",
  borderRadius: "4px",
  color: "#DDAA55",
  backgroundColor: "transparent",
  border: "none",
  transition: "all 0.15s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#DDAA55",
    color: "#fff",
  },
});

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

        <Stack direction="row" spacing={2} alignItems="center">
          <NavButton onClick={toggleLanguage}>
            {i18n.language === "en" ? "日本語" : "English"}
          </NavButton>
          <NavButton onClick={() => scrollToSection("hero")}>
            {t("header.home")}
          </NavButton>
          <NavButton onClick={() => scrollToSection("about")}>
            {t("header.about")}
          </NavButton>
          <NavButton onClick={() => scrollToSection("products")}>
            {t("header.products")}
          </NavButton>
          <NavButton
            onClick={() => {
              window.open("https://old.metrom.app", "_blank");
            }}>
            {t("header.old")}
          </NavButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
