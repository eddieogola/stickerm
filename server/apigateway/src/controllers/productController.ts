import config from "../config";
import { ServiceError } from "@grpc/grpc-js";
import { Product } from "../models/Product";

export const createProduct = (productData: Product) => {
  // Implementation for creating a new product
  config.productClient.CreateProduct(
    productData,
    (error: ServiceError | null, response: any) => {
      if (error) {
        console.error("Error creating product:", error);
        return;
      }
      console.log("Product created successfully:", response);
    },
  );
};

export const getProducts = () => {
  // Implementation for fetching products
  config.productClient.GetProducts({}, (error, response) => {
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }
    console.log("Fetched products successfully:", response);
  });
};

export const getProductById = (id: Pick<Product, "id">) => {
  // Implementation for fetching a product by ID
  config.productClient.GetProductById({ id }, (error, response) => {
    if (error) {
      console.error("Error fetching product by ID:", error);
      return;
    }
    console.log("Fetched product by ID successfully:", response);
  });
};

export const updateProduct = (
  id: Pick<Product, "id">,
  productData: Partial<Omit<Product, "id">>,
) => {
  // Implementation for updating a product
  config.productClient.UpdateProduct({ id, productData }, (error, response) => {
    if (error) {
      console.error("Error updating product:", error);
      return;
    }
    console.log("Product updated successfully:", response);
  });
};

export const deleteProduct = (id: Pick<Product, "id">) => {
  // Implementation for deleting a product
  config.productClient.DeleteProduct({ id }, (error, response) => {
    if (error) {
      console.error("Error deleting product:", error);
      return;
    }
    console.log("Product deleted successfully:", response);
  });
};
