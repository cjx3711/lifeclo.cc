import { Stack, Box } from "@mui/system";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import photo_tokyo from "../assets/photo_tokyo.jpg";
import { useState } from "react";
import Modal from "./Modal";

const ProductsSection = () => {
  const { t } = useTranslation();
  const products = [
    {
      id: "jr",
      title: t("products.products.jr"),
      tag: t("products.tags.display-light"),
      image: photo_tokyo,
      angles: { start: 6, final: 3 },
    },
    {
      id: "metro",
      title: t("products.products.metro"),
      tag: t("products.tags.display-light"),
      image: photo_tokyo,
      angles: { start: -7, final: -3 },
    },
    {
      id: "sg2030",
      title: t("products.products.sg2030"),
      tag: t("products.tags.display"),
      image: photo_tokyo,
      angles: { start: 7, final: 3 },
    },
    {
      id: "sf",
      title: t("products.products.sf"),
      tag: t("products.tags.display"),
      image: photo_tokyo,
      angles: { start: -6, final: -2 },
    },
    {
      id: "taiwan",
      title: t("products.products.taiwan"),
      tag: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "hokkaido",
      title: t("products.products.hokkaido"),
      tag: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "sapporo",
      title: t("products.products.sapporo"),
      tag: t("products.tags.wip"),
      image: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
    {
      id: "london",
      title: t("products.products.london"),
      tag: t("products.tags.thinking"),
      image: photo_tokyo,
      angles: { start: -6, final: -3 },
    },
    {
      id: "paris",
      title: t("products.products.paris"),
      tag: t("products.tags.thinking"),
      image: photo_tokyo,
      angles: { start: 7, final: 3 },
    },
  ];

  const merchandise = [
    {
      id: "pcb_lines",
      title: t("products.merch.pcb_lines.title"),
      subtitle: t("products.merch.pcb_lines.subtitle"),
      image: photo_tokyo,
      angles: { start: 5, final: 2 },
    },
    {
      id: "landmarks",
      title: t("products.merch.landmarks.title"),
      subtitle: t("products.merch.landmarks.subtitle"),
      image: photo_tokyo,
      angles: { start: -5, final: -2 },
    },
    {
      id: "postcards",
      title: t("products.merch.postcards.title"),
      subtitle: t("products.merch.postcards.subtitle"),
      image: photo_tokyo,
      angles: { start: 6, final: 2 },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box id="products">
        <h2>{t("products.series_title")}</h2>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          flexWrap="wrap"
          justifyContent="center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              description={product.tag}
              isProduct={true}
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 8 }}>
        <h2>{t("products.merch_title")}</h2>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          flexWrap="wrap"
          justifyContent="center">
          {merchandise.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              description={item.subtitle}
              isProduct={false}
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
