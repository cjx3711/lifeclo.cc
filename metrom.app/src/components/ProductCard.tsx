import { Box } from "@mui/system";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
}

const ProductCard = ({ title, description, image }: ProductCardProps) => {
  return (
    <Box
      sx={{
        width: "300px",
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}>
      <img src={image} alt={title} style={{ width: "100%", height: "auto" }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </Box>
  );
};

export default ProductCard;
