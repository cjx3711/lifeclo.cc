import { Box, Stack, styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import SkewedImage from "./SkewedImage";
import metro from "../assets/hero-metro.jpg";

const BodyText = styled("p")({
  whiteSpace: "pre-line",
  fontSize: "1.2rem",
  lineHeight: "1.5",
  margin: "0.5rem 0",
  letterSpacing: "0.03em",
});

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box id="hero" sx={{ marginBottom: { xs: "1rem", md: "3rem" } }} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "50vh" }}>
        <Stack
          flex={1}
          padding={2}
          maxWidth={{ sm: "500px", md: "100%" }}
          flexGrow={{ sm: "1", md: "1" }}
          mx="auto"
          justifyContent="center"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}>
          {t("hero.description")
            .split("\n")
            .map((line, index) => (
              <BodyText key={index}>{line}</BodyText>
            ))}
        </Stack>

        <Box
          flex={1}
          maxWidth={{ sm: "500px", md: "100%" }}
          flexGrow={{ sm: "1", md: "1.5", lg: "2" }}
          mx="auto">
          <SkewedImage
            imageUrl={metro}
            alt="Hero"
            startAngle={13}
            finalAngle={4}
            lock={false}
            borderRadius={15}
          />
        </Box>
      </Stack>
    </>
  );
};

export default HeroSection;
