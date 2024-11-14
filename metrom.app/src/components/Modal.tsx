import { Box, Stack, styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Product } from "./ProductSection";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { GOLD } from "../utils/colours";
import { openEmail } from "../utils/email";

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
  opacity: 0.8;
  cursor: pointer;
  font-size: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: color 0.2s ease;
  cursor: pointer;
  :hover {
    color: ${GOLD};
  }
`;

const Modal = ({ isOpen, onClose, selectedProduct }: ModalProps) => {
  const { t } = useTranslation();
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  useEffect(() => {
    setIsImageFullscreen(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const { title, long_description, image_full, link, price, subtitle, stamp } =
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
        zIndex: 5000,
      }}>
      <CloseButton onClick={onClose}>✕</CloseButton>

      {isImageFullscreen ? (
        <Box
          onClick={(e) => {
            e.stopPropagation();
            setIsImageFullscreen(false);
          }}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}>
          <img
            src={image_full}
            alt={title}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
            }}
          />
        </Box>
      ) : (
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "relative",
            backgroundColor: "#00341D",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: "90%",
            width: { xs: "100%", sm: "75%", md: "500px", lg: "650px" },
            maxHeight: "calc(85vh - 3rem)",
            overflowY: "auto",
          }}>
          <Stack spacing={4}>
            <h2 style={{ margin: 0 }}>{t(title)}</h2>
            {image_full && (
              <Box
                onClick={() => setIsImageFullscreen(true)}
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  cursor: "zoom-in",
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

            {stamp && (
              <p style={{ marginTop: "1rem", opacity: 0.8 }}>
                Status: {t(stamp)}
              </p>
            )}

            {subtitle && (
              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                {t(subtitle)}
              </p>
            )}

            {long_description && (
              <p
                style={{
                  marginTop: "1rem",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}>
                {t(long_description)}
              </p>
            )}

            {price && (
              <p
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}>
                {t(price)}
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
                <Button style={{ width: "100%" }}>
                  {t("modal.btn_buy_now")}
                </Button>
              </a>
            ) : (
              <Stack spacing={2} marginTop={2}>
                <p
                  style={{
                    opacity: 0.7,
                    fontSize: "1rem",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}>
                  {t("modal.contact_interest")}
                </p>
                <Button
                  onClick={() => {
                    onClose();
                    openEmail();
                  }}>
                  {t("contact.email")}
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Modal;
