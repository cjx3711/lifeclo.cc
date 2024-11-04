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

const ProductsSection = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: "jr",
      title: t("products.products.jr"),
      description: t("products.tags.display-light"),
      image: photo_tokyo,
      angles: { start: 6, final: 3 },
      link: "",
    },
    {
      id: "metro",
      title: t("products.products.metro"),
      description: t("products.tags.display-light"),
      image: photo_tokyo,
      angles: { start: -7, final: -3 },
      link: "",
    },
    {
      id: "sg2030",
      title: t("products.products.sg2030"),
      description: t("products.tags.display"),
      image: photo_tokyo,
      angles: { start: 7, final: 3 },
      link: "www.google.com",
    },
    {
      id: "sf",
      title: t("products.products.sf"),
      description: t("products.tags.display"),
      image: photo_tokyo,
      angles: { start: -6, final: -2 },
    },
    {
      id: "taiwan",
      title: t("products.products.taiwan"),
      stamp: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "hokkaido",
      title: t("products.products.hokkaido"),
      stamp: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "sapporo",
      title: t("products.products.sapporo"),
      stamp: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
    {
      id: "london",
      title: t("products.products.london"),
      stamp: t("products.tags.thinking"),
      image: photo_tokyo,
      angles: { start: -6, final: -3 },
    },
    {
      id: "paris",
      title: t("products.products.paris"),
      stamp: t("products.tags.thinking"),
      image: photo_tokyo,
      angles: { start: 7, final: 3 },
    },
  ];

  const merchandise = [
    {
      id: "pcb_lines",
      title: t("products.merch.pcb_lines.title"),
      description: t("products.merch.pcb_lines.subtitle"),
      image: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "landmarks",
      title: t("products.merch.landmarks.title"),
      description: t("products.merch.landmarks.subtitle"),
      image: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "postcards",
      title: t("products.merch.postcards.title"),
      description: t("products.merch.postcards.subtitle"),
      image: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState();

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
              {...product}
              description={product.description}
              stamp={product.stamp}
              onClick={() => setIsModalOpen(true)}
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
              {...item}
              description={item.description}
              stamp={item.stamp}
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </Stack>
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ProductsSection;
