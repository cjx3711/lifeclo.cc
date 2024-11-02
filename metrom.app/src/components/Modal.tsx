import { Box, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}>
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: "#00341D",
          padding: "2rem",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          maxWidth: "90%",
          width: "400px",
        }}>
        <Stack spacing={3}>
          <h2>{t("modal.coming_soon")}</h2>
          <p>{t("modal.contact_interest")}</p>
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}>
            {t("modal.close")}
          </button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Modal;
