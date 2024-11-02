import { Stack } from "@mui/system";
import SkewedImage from "./SkewedImage";
import { useState } from "react";
import Modal from "./Modal";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  angles: { start: number; final: number };
  isProduct: boolean;
  onClick: () => void;
}

const ProductCard = ({
  title,
  description,
  image,
  angles,
  isProduct,
  onClick,
}: ProductCardProps) => {
  return (
    <>
      <Stack
        onClick={onClick}
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          width: "300px",
          padding: "1rem",
          backgroundColor: isProduct
            ? "transparent"
            : "rgba(255, 255, 255, 0.05)",
          borderRadius: isProduct ? 0 : "8px",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}>
        <SkewedImage
          imageUrl={image}
          alt={title}
          startAngle={angles.start}
          finalAngle={angles.final}
          lock={false}
        />

        <h3 style={{ marginTop: "50px" }}>{title}</h3>
        <p
          style={{
            marginBottom: "70px",
            fontSize: isProduct ? "1rem" : "0.9rem",
            opacity: isProduct ? 0.9 : 0.7,
          }}>
          {description}
        </p>
      </Stack>
    </>
  );
};

export default ProductCard;
