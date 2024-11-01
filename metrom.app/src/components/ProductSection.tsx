import { Stack, Box } from "@mui/system";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import photo_tokyo from "../assets/photo_tokyo.jpg";

const ProductsSection = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: 1,
      title: t("products.product1.title"),
      description: t("products.product1.description"),
      image: photo_tokyo,
      angles: { start: 6, final: 3 },
    },
    {
      id: 2,
      title: t("products.product2.title"),
      description: t("products.product2.description"),
      image: photo_tokyo,
      angles: { start: -7, final: -3 },
    },
    {
      id: 3,
      title: t("products.product3.title"),
      description: t("products.product3.description"),
      image: photo_tokyo,
      angles: { start: 7, final: 3 },
    },
  ];

  return (
    <Box id="products">
      <h2>{t("products.title")}</h2>
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
