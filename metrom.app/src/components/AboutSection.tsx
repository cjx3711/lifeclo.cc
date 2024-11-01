import { Stack, Box } from "@mui/system";
import SkewedImage from "./SkewedImage";
import { useTranslation } from "react-i18next";
import tokyo from "../assets/tokyo.jpg";

const AboutSection = () => {
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
        <h2>{t("about.title")}</h2>
        <p>{t("about.description")}</p>
      </Box>
    </Stack>
  );
};

export default AboutSection;
