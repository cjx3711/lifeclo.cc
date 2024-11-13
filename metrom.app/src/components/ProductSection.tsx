import { Stack, Box } from "@mui/system";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import photo_tokyo from "../assets/photo_tokyo.jpg";
import { useState } from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";

import thumb_jr from "../assets/product/thumb_tokyojr.png";
import thumb_metro from "../assets/product/thumb_tokyometro.png";
import thumb_sg2030 from "../assets/product/thumb_sg30.png";
import thumb_sf from "../assets/product/thumb_sf.png";
import thumb_sg27 from "../assets/product/thumb_sg27.png";

import full_jr from "../assets/product/full_tokyojr.jpg";
import full_metro from "../assets/product/full_tokyometro.jpg";
import full_sg2030 from "../assets/product/full_sg30.jpg";
import full_sf from "../assets/product/full_sf.jpg";
import full_sg27 from "../assets/product/full_sg27.jpg";

import thumb_wip from "../assets/product/thumb_wip.png";

import thumb_washi_foil from "../assets/product/thumb_washi_foil.png";
import thumb_washi_lines from "../assets/product/thumb_washi_lines.png";

import full_washi_foil from "../assets/product/full_washi_foil.jpg";
import full_washi_lines from "../assets/product/full_washi_lines.jpg";

import thumb_cards from "../assets/product/thumb_cards.png";
import full_cards from "../assets/product/full_cards.jpg";

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
  goldOutline?: boolean;
  angles: { start: number; final: number };
};

const ProductsSection = () => {
  const { t } = useTranslation();
  const products: Product[] = [
    {
      id: "jr",
      title: t("products.products.jr"),
      subtitle: t("products.tags.display-light"),
      image_thumbnail: thumb_jr,
      image_full: full_jr,
      angles: { start: 6, final: 3 },
      link: "",
      goldOutline: true,
    },
    {
      id: "metro",
      title: t("products.products.metro"),
      subtitle: t("products.tags.display-light"),
      image_thumbnail: thumb_metro,
      image_full: full_metro,
      angles: { start: -7, final: -3 },
      link: "",
      goldOutline: true,
    },
    {
      id: "sg2030",
      title: t("products.products.sg2030"),
      subtitle: t("products.tags.display"),
      image_thumbnail: thumb_sg2030,
      image_full: full_sg2030,
      angles: { start: 7, final: 1 },
      link: "www.google.com",
      goldOutline: true,
    },
    {
      id: "sf",
      title: t("products.products.sf"),
      subtitle: t("products.tags.display"),
      image_thumbnail: thumb_sf,
      image_full: full_sf,
      angles: { start: -6, final: -2 },
      goldOutline: true,
    },
    {
      id: "sg2027",
      title: t("products.products.sg2027"),
      subtitle: t("products.tags.display"),
      image_thumbnail: thumb_sg27,
      image_full: full_sg27,
      angles: { start: 7, final: 3 },
      link: "www.google.com",
      goldOutline: true,
    },
    {
      id: "taiwan",
      title: t("products.products.taiwan"),
      stamp: t("products.tags.wip"),
      image_thumbnail: thumb_wip,
      image_full: thumb_wip,
      angles: { start: 5, final: 2 },
      goldOutline: true,
    },
    {
      id: "sapporo",
      title: t("products.products.sapporo"),
      stamp: t("products.tags.wip"),
      image_thumbnail: thumb_wip,
      image_full: thumb_wip,
      angles: { start: 6, final: 2 },
      goldOutline: true,
    },
    {
      id: "london",
      title: t("products.products.london"),
      stamp: t("products.tags.thinking"),
      image_thumbnail: thumb_wip,
      image_full: thumb_wip,
      angles: { start: -6, final: -3 },
      goldOutline: true,
    },
    {
      id: "paris",
      title: t("products.products.paris"),
      stamp: t("products.tags.thinking"),
      image_thumbnail: thumb_wip,
      image_full: thumb_wip,
      angles: { start: 7, final: 3 },
      goldOutline: true,
    },
  ];

  const merchandise: Product[] = [
    {
      id: "pcb_lines",
      title: t("products.merch.pcb_lines.title"),
      subtitle: t("products.merch.pcb_lines.subtitle"),
      image_thumbnail: thumb_washi_lines,
      image_full: full_washi_lines,
      angles: { start: 5, final: 2 },
      goldOutline: true,
    },
    {
      id: "landmarks",
      title: t("products.merch.landmarks.title"),
      subtitle: t("products.merch.landmarks.subtitle"),
      image_thumbnail: thumb_washi_foil,
      image_full: full_washi_foil,
      angles: { start: -5, final: -2 },
      goldOutline: true,
    },
    {
      id: "postcards",
      title: t("products.merch.postcards.title"),
      subtitle: t("products.merch.postcards.subtitle"),
      image_thumbnail: thumb_cards,
      image_full: full_cards,

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
              goldOutline={product.goldOutline}
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
              goldOutline={item.goldOutline}
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
