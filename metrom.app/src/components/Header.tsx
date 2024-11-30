import { Button } from "@mui/base";
import { Box, Stack, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import LanguageSwitch from "./LanguageSwitch";
import { GOLD } from "../utils/colours";

const NavButton = styled(Button)({
  padding: "8px 10px",
  borderRadius: "4px",
  width: "120px",
  height: "36px",
  fontSize: "1rem",
  color: GOLD,
  backgroundColor: "transparent",
  border: "none",
  transition: "all 0.15s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: GOLD,
    color: "#fff",
  },
});

const MobileNavButton = styled(NavButton)({
  width: "100%",
});

const MobileMenuButton = styled(Button)({
  display: "none",
  backgroundColor: "transparent",
  border: "none",
  padding: "8px",
  cursor: "pointer",
  "@media (max-width: 700px)": {
    display: "block",
  },
});

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={GOLD}>
    <rect y="4" width="24" height="2" rx="1" />
    <rect y="11" width="24" height="2" rx="1" />
    <rect y="18" width="24" height="2" rx="1" />
  </svg>
);

const MobileMenu = styled(Box)(({ isOpen }: { isOpen: boolean }) => ({
  position: "fixed",
  top: "72px",
  left: 0,
  backgroundColor: "rgba(0, 52, 29, 0.95)",
  backdropFilter: "blur(8px)",
  width: "calc(100% - 2rem)",
  transform: isOpen ? "translateY(0)" : "translateY(-20%)",
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? "auto" : "none",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  padding: "1rem",
  boxShadow: "-4px 0 8px rgba(0,0,0,0.2)",
  display: "none",
  "@media (max-width: 750px)": {
    display: "block",
  },
}));

const NavButtons = styled(Stack)(({ isMobile }: { isMobile: boolean }) => ({
  display: isMobile ? "none" : "flex",
  "@media (max-width: 750px)": {
    display: isMobile ? "flex" : "none",
  },
}));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        padding: "1rem",
        zIndex: 1000,
        backgroundColor:
          isScrolled || isMobileMenuOpen
            ? "rgba(10, 10, 10, 0.6)"
            : "transparent",
        backdropFilter: isScrolled || isMobileMenuOpen ? "blur(4px)" : "none",
        borderBottom:
          isScrolled || isMobileMenuOpen
            ? "2px solid rgba(120, 120, 120, 0.2)"
            : "none",
        boxShadow:
          isScrolled || isMobileMenuOpen ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
        transition: "all 0.2s ease-in-out",
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "40px",
            filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("hero")}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <LanguageSwitch
            isJapanese={i18n.language === "ja"}
            onToggle={toggleLanguage}
          />

          {/* Desktop Menu */}
          <NavButtons
            isMobile={false}
            direction="row"
            spacing={{
              xs: 0,
              sm: 0,
              md: 3,
            }}>
            <NavButton
              onClick={() => {
                window.open("https://ko-fi.com/cjx3711/shop", "_blank");
              }}>
              {t("header.shop")}
            </NavButton>
            <NavButton onClick={() => scrollToSection("products")}>
              {t("header.products")}
            </NavButton>
            <NavButton onClick={() => scrollToSection("contact")}>
              {t("header.contact")}
            </NavButton>
            <NavButton
              onClick={() => {
                window.open("https://old.metrom.app", "_blank");
              }}>
              {t("header.old")}
            </NavButton>
          </NavButtons>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <HamburgerIcon />
          </MobileMenuButton>
        </Stack>
      </Stack>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavButtons isMobile={true} direction="column" spacing={2}>
          <MobileNavButton
            onClick={() => {
              window.open("https://ko-fi.com/cjx3711/shop", "_blank");
            }}>
            {t("header.shop")}
          </MobileNavButton>
          <MobileNavButton onClick={() => scrollToSection("products")}>
            {t("header.products")}
          </MobileNavButton>
          <MobileNavButton onClick={() => scrollToSection("contact")}>
            {t("header.contact")}
          </MobileNavButton>
          <MobileNavButton
            onClick={() => {
              window.open("https://old.metrom.app", "_blank");
            }}>
            {t("header.old")}
          </MobileNavButton>
        </NavButtons>
      </MobileMenu>
    </Box>
  );
};

export default Header;
