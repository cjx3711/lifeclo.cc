import { Box, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import SkewedImage from "./SkewedImage";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <Stack
      id="hero"
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      alignItems="center"
      sx={{ minHeight: "80vh" }}>
      <Box flex={1}>
        <p>{t("hero.description")}</p>
      </Box>

      <Box flex={1}>
        <SkewedImage
          imageUrl={"/favicon.png"}
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
