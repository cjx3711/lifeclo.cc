import { Stack } from "@mui/system";
import SkewedImage from "./SkewedImage";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  angles: { start: number; final: number };
}

const ProductCard = ({
  title,
  description,
  image,
  angles,
}: ProductCardProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        width: "300px",
        padding: "1rem",
      }}>
      <SkewedImage
        imageUrl={image}
        alt={title}
        startAngle={angles.start}
        finalAngle={angles.final}
        lock={false}
      />

      <h3 style={{ marginTop: "50px" }}>{title}</h3>
      <p style={{ marginBottom: "70px" }}>{description}</p>
    </Stack>
  );
};

export default ProductCard;
