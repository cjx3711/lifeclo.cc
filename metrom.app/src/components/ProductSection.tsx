import { Stack, Box } from "@mui/system";
import ProductCard from "./ProductCard";

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "Description 1",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Description 2",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Description 3",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <Box id="products">
      <h2>Our Products</h2>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        flexWrap="wrap"
        justifyContent="center">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Stack>
    </Box>
  );
};

export default ProductsSection;
