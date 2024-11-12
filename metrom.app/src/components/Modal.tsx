import { Box, Stack, styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Product } from "./ProductSection";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const CloseButton = styled("button")`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: color 0.2s ease;
  cursor: pointer;
  :hover {
    color: #006837;
  }
`;

const CTAButton = styled("button")`
  width: 100%;
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Modal = ({ isOpen, onClose, selectedProduct }: ModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;
  if (!selectedProduct) return null;

  const { title, long_description, image_full, link, price, subtitle } =
    selectedProduct;

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
          position: "relative",
          backgroundColor: "#00341D",
          padding: "2rem",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          maxWidth: "90%",
          width: { xs: "100%", md: "600px", lg: "900px" },
          maxHeight: "calc(85vh - 2rem)",
          overflowY: "auto",
        }}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Stack spacing={3}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          {image_full && (
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
              }}>
              <img
                src={image_full}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
          {long_description && (
            <p style={{ margin: 0, lineHeight: 1.6 }}>{long_description}</p>
          )}
          {subtitle && <p style={{ margin: 0, opacity: 0.8 }}>{subtitle}</p>}
          {price && (
            <p
              style={{
                margin: 0,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}>
              {price}
            </p>
          )}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
              }}>
              <CTAButton>{t("modal.btn_buy_now")}</CTAButton>
            </a>
          ) : (
            <Stack spacing={2}>
              <p
                style={{
                  margin: 0,
                  opacity: 0.8,
                }}>
                {t("modal.contact_interest")}
              </p>
              <CTAButton onClick={onClose}>{t("modal.btn_contact")}</CTAButton>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Modal;
