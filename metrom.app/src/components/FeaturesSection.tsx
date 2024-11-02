import { Stack, Box } from "@mui/system";
import SkewedImage from "./SkewedImage";
import { useTranslation } from "react-i18next";
import tokyo from "../assets/tokyo.jpg";

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <Stack
      id="about"
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={4}
      alignItems="center"
      sx={{ minHeight: "80vh" }}>
      <Box flex={1}>
        <SkewedImage
          imageUrl={tokyo}
          alt="About"
          startAngle={-15}
          finalAngle={-10}
          lock={false}
        />
      </Box>

      <Box flex={1}>
        <h1>{t("features.title")}</h1>
        <h2>{t("features.subtitle1")}</h2>
        <p>{t("features.description1")}</p>
        <h2>{t("features.subtitle2")}</h2>
        <p>{t("features.description2")}</p>
        <h2>{t("features.subtitle3")}</h2>
        <p>{t("features.description3")}</p>
      </Box>
    </Stack>
  );
};

export default FeaturesSection;
