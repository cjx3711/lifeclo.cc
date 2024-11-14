import { Stack, Box, styled } from "@mui/system";
import SkewedImage from "./SkewedImage";
import { useTranslation } from "react-i18next";
import jr from "../assets/hero-jr.jpg";

const FeaturesText = styled(Stack)`
  white-space: pre-line;
  font-size: 1.2rem;
  line-height: 1.2;
  margin: 0.5rem 0;
  letter-spacing: 0.03em;
  text-align: center;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 0rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <a id="about" style={{ marginBottom: "3rem" }} />

      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "50vh" }}>
        <Box
          flex={1}
          padding={4}
          maxWidth={{ xs: "500px", md: "100%" }}
          flexGrow={{ sm: "1", md: "1.5", lg: "2" }}>
          <SkewedImage
            imageUrl={jr}
            alt="About"
            startAngle={-14}
            finalAngle={-3}
            lock={false}
            borderRadius={15}
          />
        </Box>

        <FeaturesText flexGrow={"1"} flex={1} mx="auto">
          <h1>{t("features.title")}</h1>
          <h2>{t("features.subtitle1")}</h2>
          <p>{t("features.description1")}</p>
          <h2>{t("features.subtitle2")}</h2>
          <p>{t("features.description2")}</p>
          <h2>{t("features.subtitle3")}</h2>
          <p>{t("features.description3")}</p>
        </FeaturesText>
      </Stack>
    </>
  );
};

export default FeaturesSection;
