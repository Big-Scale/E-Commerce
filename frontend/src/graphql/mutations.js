import { gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
        id
        name
        sku
        categoryId
        price
        description
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
        id
        name
        sku
        categoryId
        price
        description
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
mutation deleteProduct($id: ID!){
  deleteProduct(id: $id)
}
`;


// Mutations for Category... 
export const CREATE_CATEGORY_MUTATION = gql`
mutation createCategory($input: CreateCategoryInput!){
    createCategory(input: $input){
        name
        description
    }
}
`;

export const UPDATE_CATEGORY_MUTATION = gql`
mutation updateCategory($input: UpdateCategoryInput!){
  updateCategory(input: $input){
        id
        name
        description
    }
}
`;

export const DELETE_CATEGORY_MUTATION = gql`
mutation deleteCategory($id: ID!){
  deleteCategory(id: $id)
}
`;

