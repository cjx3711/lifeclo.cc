import { Box, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";

import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import Modal from "./Modal";

import thumb_sf from "../assets/product/thumb_sf.png";
import thumb_sg27 from "../assets/product/thumb_sg27.png";
import thumb_sg2030 from "../assets/product/thumb_sg30.png";
import thumb_jr from "../assets/product/thumb_tokyojr.png";
import thumb_metro from "../assets/product/thumb_tokyometro.png";

import full_sf from "../assets/product/full_sf.jpg";
import full_sg27 from "../assets/product/full_sg27.jpg";
import full_sg2030 from "../assets/product/full_sg30.jpg";
import full_jr from "../assets/product/full_tokyojr.jpg";
import full_metro from "../assets/product/full_tokyometro.jpg";

import thumb_wip from "../assets/product/thumb_wip.png";

import thumb_washi_foil from "../assets/product/thumb_washi_foil.png";
import thumb_washi_lines from "../assets/product/thumb_washi_lines.png";

import full_washi_foil from "../assets/product/full_washi_foil.jpg";
import full_washi_lines from "../assets/product/full_washi_lines.jpg";

import full_cards from "../assets/product/full_cards.jpg";
import thumb_cards from "../assets/product/thumb_cards.png";

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
  const products: Product[] = useMemo(
    () => [
      {
        id: "jr",
        title: "products.products.jr",
        subtitle: "products.tags.display-light",
        long_description: "products.product_description.jr",
        image_thumbnail: thumb_jr,
        image_full: full_jr,
        angles: { start: 6, final: 3 },
        link: "",
        goldOutline: true,
      },
      {
        id: "metro",
        title: "products.products.metro",
        subtitle: "products.tags.display-light",
        long_description: "products.product_description.metro",
        image_thumbnail: thumb_metro,
        image_full: full_metro,
        angles: { start: -7, final: -3 },
        link: "",
        goldOutline: true,
      },
      {
        id: "sg2030",
        title: "products.products.sg2030",
        subtitle: "products.tags.display",
        long_description: "products.product_description.sg2030",
        image_thumbnail: thumb_sg2030,
        image_full: full_sg2030,
        angles: { start: 7, final: 1 },
        link: "",
        goldOutline: true,
      },
      {
        id: "sg2027",
        title: "products.products.sg2027",
        subtitle: "products.tags.display",
        long_description: "products.product_description.sg2027",
        image_thumbnail: thumb_sg27,
        image_full: full_sg27,
        angles: { start: 7, final: 3 },
        link: "",
        goldOutline: true,
      },
      {
        id: "sf",
        title: "products.products.sf",
        subtitle: "products.tags.display",
        long_description: "products.product_description.sf",
        image_thumbnail: thumb_sf,
        image_full: full_sf,
        angles: { start: -6, final: -2 },
        goldOutline: true,
      },

      {
        id: "taiwan",
        title: "products.products.taiwan",
        stamp: "products.tags.wip",
        image_thumbnail: thumb_wip,
        angles: { start: 5, final: 2 },
        goldOutline: true,
      },
      {
        id: "sapporo",
        title: "products.products.sapporo",
        stamp: "products.tags.wip",
        image_thumbnail: thumb_wip,
        angles: { start: 6, final: 2 },
        goldOutline: true,
      },
      {
        id: "london",
        title: "products.products.london",
        stamp: "products.tags.wip",
        image_thumbnail: thumb_wip,
        angles: { start: -6, final: -3 },
        goldOutline: true,
      },
      {
        id: "paris",
        title: "products.products.paris",
        stamp: "products.tags.wip",
        image_thumbnail: thumb_wip,
        angles: { start: 7, final: 3 },
        goldOutline: true,
      },
    ],
    []
  );

  const merchandise: Product[] = useMemo(
    () => [
      {
        id: "pcb_lines",
        title: "products.merch.pcb_lines.title",
        subtitle: "products.merch.pcb_lines.subtitle",
        image_thumbnail: thumb_washi_lines,
        image_full: full_washi_lines,
        angles: { start: 5, final: 2 },
        goldOutline: true,
      },
      {
        id: "landmarks",
        title: "products.merch.landmarks.title",
        subtitle: "products.merch.landmarks.subtitle",
        image_thumbnail: thumb_washi_foil,
        image_full: full_washi_foil,
        angles: { start: -5, final: -2 },
        goldOutline: true,
      },
      {
        id: "postcards",
        title: "products.merch.postcards.title",
        subtitle: "products.merch.postcards.subtitle",
        image_thumbnail: thumb_cards,
        image_full: full_cards,

        angles: { start: 6, final: 2 },
      },
    ],
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Box id="products" sx={{ marginBottom: { xs: "1rem", sm: "3rem" } }} />
      <Box>
        <SectionTitle>{t("products.series_title")}</SectionTitle>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={t(product.title)}
              angles={product.angles}
              image={product.image_thumbnail}
              subtitle={product.subtitle && t(product.subtitle)}
              stamp={product.stamp && t(product.stamp)}
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
              title={t(item.title)}
              angles={item.angles}
              image={item.image_thumbnail}
              subtitle={item.subtitle && t(item.subtitle)}
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
