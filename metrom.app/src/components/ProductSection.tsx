import { Stack, Box } from "@mui/system";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import photo_tokyo from "../assets/photo_tokyo.jpg";
import { useState } from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";

const SectionTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  long_description?: string;
  stamp?: string;
  image_thumbnail: string;
  image_full?: string;
  link?: string;
  price?: string;
  angles: { start: number; final: number };
};

const ProductsSection = () => {
  const { t } = useTranslation();
  const products: Product[] = [
    {
      id: "jr",
      title: t("products.products.jr"),
      subtitle: t("products.tags.display-light"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 6, final: 3 },
      link: "",
    },
    {
      id: "metro",
      title: t("products.products.metro"),
      subtitle: t("products.tags.display-light"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: -7, final: -3 },
      link: "",
    },
    {
      id: "sg2030",
      title: t("products.products.sg2030"),
      subtitle: t("products.tags.display"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 7, final: 3 },
      link: "www.google.com",
    },
    {
      id: "sf",
      title: t("products.products.sf"),
      subtitle: t("products.tags.display"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: -6, final: -2 },
    },
    {
      id: "taiwan",
      title: t("products.products.taiwan"),
      stamp: t("products.tags.wip"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "hokkaido",
      title: t("products.products.hokkaido"),
      stamp: t("products.tags.wip"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "sapporo",
      title: t("products.products.sapporo"),
      stamp: t("products.tags.wip"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
    {
      id: "london",
      title: t("products.products.london"),
      stamp: t("products.tags.thinking"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: -6, final: -3 },
    },
    {
      id: "paris",
      title: t("products.products.paris"),
      stamp: t("products.tags.thinking"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 7, final: 3 },
    },
  ];

  const merchandise: Product[] = [
    {
      id: "pcb_lines",
      title: t("products.merch.pcb_lines.title"),
      subtitle: t("products.merch.pcb_lines.subtitle"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "landmarks",
      title: t("products.merch.landmarks.title"),
      subtitle: t("products.merch.landmarks.subtitle"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "postcards",
      title: t("products.merch.postcards.title"),
      subtitle: t("products.merch.postcards.subtitle"),
      image_thumbnail: photo_tokyo,
      image_full: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Box id="products">
        <SectionTitle>{t("products.series_title")}</SectionTitle>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              angles={product.angles}
              image={product.image_thumbnail}
              subtitle={product.subtitle}
              stamp={product.stamp}
              onClick={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 8 }}>
        <SectionTitle>{t("products.merch_title")}</SectionTitle>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center">
          {merchandise.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              angles={item.angles}
              image={item.image_thumbnail}
              subtitle={item.subtitle}
              onClick={() => {
                setSelectedProduct(item);
                setIsModalOpen(true);
              }}
            />
          ))}
        </Stack>
      </Box>

      <Modal
        isOpen={isModalOpen}
        selectedProduct={selectedProduct}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductsSection;
