import { Stack } from "@mui/system";
import SkewedImage from "./SkewedImage";
import styled from "@emotion/styled";

interface ProductCardProps {
  title: string;
  subtitle?: string;
  stamp?: string;
  image: string;
  angles: { start: number; final: number };
  onClick: () => void;
  goldOutline?: boolean;
}

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  margin: 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const ProductCard = ({
  title,
  subtitle,
  stamp,
  image,
  angles,
  onClick,
  goldOutline = false,
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
          backgroundColor: "transparent",
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
          text={stamp}
          goldOutline={goldOutline}
        />
        <Stack
          sx={{
            height: "100px",
          }}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={0}>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Stack>
      </Stack>
    </>
  );
};

export default ProductCard;
