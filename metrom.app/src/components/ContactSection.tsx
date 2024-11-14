import { Box, Stack, styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { openEmail } from "../utils/email";

const ContactText = styled(Stack)`
  h4 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.5;
  }

  button {
    font-size: 1.1rem;
  }
`;

const ContactSection = () => {
  const { t } = useTranslation();

  const openInstagram = () => {
    window.open("https://www.instagram.com/cjx3711/", "_blank");
  };

  return (
    <>
      <a id="contact" style={{ marginTop: "10rem", marginBottom: "2rem" }} />
      <Box>
        <ContactText spacing={5} alignItems="center" textAlign="center">
          <h4>{t("contact.title")}</h4>
          <p style={{ maxWidth: "600px" }}>{t("contact.description")}</p>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={openEmail}>{t("contact.email")}</Button>
            <Button onClick={openInstagram}>{t("contact.instagram")}</Button>
          </Stack>
        </ContactText>
      </Box>
    </>
  );
};

export default ContactSection;
