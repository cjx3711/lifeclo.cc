import { Box, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import SkewedImage from "./SkewedImage";
import tokyo from "../assets/tokyo.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <Stack
      id="hero"
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "80vh" }}>
      <Stack
        flex={1}
        padding={4}
        maxWidth={{ sm: "500px", md: "100%" }}
        mx="auto"
        justifyContent="center"
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}>
        <p>{t("hero.description")}</p>
      </Stack>

      <Box
        flex={1}
        padding={4}
        maxWidth={{ xs: "500px", md: "100%" }}
        mx="auto">
        <SkewedImage
          imageUrl={tokyo}
          alt="Hero"
          startAngle={13}
          finalAngle={10}
          lock={false}
        />
      </Box>
    </Stack>
  );
};

export default HeroSection;
