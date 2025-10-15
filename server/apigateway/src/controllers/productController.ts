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
          logger.error("Error creating product:" + JSON.stringify(error));
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
      (error: ServiceError | null, res: { products: Product[] }) => {
        if (error) {
          logger.error("Error fetching products:" + JSON.stringify(error));
          reject(error);
          return;
        }
        logger.info(
          "Fetched products successfully:" + JSON.stringify(res.products),
        );
        resolve(res.products);
      },
    );
  });
};

export const getProductById = (id: string): Promise<Product | Error> => {
  return new Promise((resolve, reject) => {
    config.productClient.GetProductById(
      { id },
      (error: ServiceError | null, response: { product: Product }) => {
        if (error) {
          logger.error("Error fetching product by ID:" + JSON.stringify(error));
          reject(error);
          return;
        }
        logger.info(
          "Fetched product by ID successfully:" +
            JSON.stringify(response.product),
        );
        resolve(response.product);
      },
    );
  });
};

export const updateProduct = (
  productData: Product,
): Promise<Product | Error> => {
  return new Promise((resolve, reject) => {
    config.productClient.UpdateProduct(
      productData,
      (error: ServiceError | null, response: { product: Product }) => {
        if (error) {
          logger.error("Error updating product:" + JSON.stringify(error));
          reject(error);
          return;
        }
        logger.info("Product updated successfully:" + JSON.stringify(response));
        resolve(response.product);
      },
    );
  });
};

export const deleteProduct = (
  id: string,
): Promise<{ status: "success" | "failure"; message: string } | Error> => {
  logger.info("Attempting to delete product with ID: " + id);

  return new Promise((resolve, reject) => {
    config.productClient.DeleteProduct(
      { id },
      (
        error: ServiceError | null,
        response: { success: boolean; message: string },
      ) => {
        if (error) {
          logger.error("Error deleting product:" + JSON.stringify(error));
          reject(error);
          return;
        }
        logger.info("Product deleted successfully:" + JSON.stringify(response));
        resolve({
          status: response.success ? "success" : "failure",
          message: response.message,
        });
      },
    );
  });
};
