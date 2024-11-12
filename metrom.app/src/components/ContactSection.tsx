import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

const ContactSection = () => {
  const { t } = useTranslation();

  const handleEmailClick = () => {
    window.location.href = "mailto:your-email@example.com";
  };

  return (
    <div style={{ position: "relative" }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <h4>{t("contact.title")}</h4>
        <p style={{ maxWidth: "600px" }}>{t("contact.description")}</p>
        <Button onClick={handleEmailClick}>{t("contact.button")}</Button>
      </Stack>
    </div>
  );
};

export default ContactSection;
