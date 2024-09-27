import React, { useState } from "react";
import CarouselCpn from "./carousel";
import LeftProductCategoryCpn from "./leftProductCategory";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import ProductDrawerCpn from "./productDrawer";
import MainCpn from "./main";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_QUERY } from "../../graphql/queries";
import { GET_PRODUCTS_QUERY } from "../../graphql/queries";
import { SEARCH_PRODUCTS_QUERY } from "../../graphql/queries";

const categories = [
  {
    name: "first",
    description: "description1",
  },
  {
    name: "second",
    description: "description2",
  },
  {
    name: "third",
    description: "description3",
  },
  {
    name: "forth",
    description: "description4",
  },
];
const products = [
  {
    name: "product1",
    SKU: "sku1",
    price: "price1",
    description: " descriptioin1",
  },
  {
    name: "product2",
    SKU: "sku2",
    price: "price2",
    description: " descriptioin2",
  },
  {
    name: "product3",
    SKU: "sku3",
    price: "price3",
    description: " descriptioin3",
  },
  {
    name: "product4",
    SKU: "sku1",
    price: "price4",
    description: " descriptioin4",
  },
  {
    name: "product5",
    SKU: "1233523452345",
    price: "500$",
    description: " Apple",
  },
];
export default function ProductManagementCpn() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES_QUERY);
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery(GET_PRODUCTS_QUERY);

  if (categoriesLoading || productsLoading) return <p>Loading...</p>;
  if (categoriesError)
    return <p>Error loading categories: {categoriesError.message}</p>;
  if (productsError)
    return <p>Error loading products: {productsError.message}</p>;

  return (
    <div className="container">
      <CarouselCpn />
      <Grid container spacing={2}>
        <Grid xs={2}>
          <LeftProductCategoryCpn
            setActiveCategory={setActiveCategory}
            categories={[...categoriesData.categories]}
            openDrawer={setOpenDrawer}
          />
        </Grid>
        <Grid xs={10}>
          <MainCpn
            categories={categoriesData.categories}
            products={productsData.products.filter((aProduct: any) => {
              let categoryMatch = false;
              if (activeCategory === 0) {
                categoryMatch = true;
              } else {
                categoryMatch = aProduct.categoryId === activeCategory;
              }
              const contentMatch =
                searchTerm === ""
                  ? true
                  : aProduct.name
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase()) !== -1 ||
                    aProduct.description
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase()) !== -1;
              return categoryMatch && contentMatch;
            })}
            setSearchTerm={setSearchTerm}
          />
        </Grid>
      </Grid>
      <ProductDrawerCpn
        categories={categoriesData.categories}
        open={openDrawer}
        openDrawer={setOpenDrawer}
      />
    </div>
  );
}
