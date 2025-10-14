import config from "../config";
import { ServiceError } from "@grpc/grpc-js";
import { Product } from "../models/Product";
import logger from "../utils/logger";

export const createProduct = (
  productData: Product,
): Promise<Product | Error> => {
  return new Promise((resolve, reject) => {
    config.productClient.CreateProduct(
      productData,
      (error: ServiceError | null, response: { product: Product }) => {
        if (error) {
          logger.error("Error creating product:" + error.message);
          reject(error);
          return;
        }

        logger.info(
          "Product created successfully: " + JSON.stringify(response.product),
        );
        resolve(response.product);
      },
    );
  });
};

export const getProducts = (): Promise<Product[] | Error> => {
  return new Promise((resolve, reject) => {
    config.productClient.GetProducts(
      {},
      (error: ServiceError | null, res: any) => {
        if (error) {
          console.error("Error fetching products:", error);
          reject(error);
          return;
        }
        logger.info("Fetched products successfully:", res);
        resolve(res.products);
      },
    );
  });
};

export const getProductById = (id: Pick<Product, "id">) => {
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
  config.productClient.UpdateProduct({ id, productData }, (error, response) => {
    if (error) {
      console.error("Error updating product:", error);
      return;
    }
    console.log("Product updated successfully:", response);
  });
};

export const deleteProduct = (id: Pick<Product, "id">) => {
  config.productClient.DeleteProduct({ id }, (error, response) => {
    if (error) {
      console.error("Error deleting product:", error);
      return;
    }
    console.log("Product deleted successfully:", response);
  });
};
