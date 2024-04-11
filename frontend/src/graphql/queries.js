import { gql } from "@apollo/client";

// queries for categories

export const GET_CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      description
    }
  }
`;

// queries for products

export const GET_PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      sku
      price
      categoryId
      description
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($name: String!) {
    searchProducts(name: $name) {
      id
      name
      sku
      price
      categoryId
      description
    }
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      id
      name
      sku
      price
      categoryId
      description
    }
  }
`;
