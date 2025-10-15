import { Client, ServiceError, credentials } from "@grpc/grpc-js";
import stickermProto from ".";
import { Product } from "../models/Product";

interface ProductService extends Client {
  CreateProduct(
    request: Product,
    callback: (
      error: ServiceError | null,
      response: { product: Product },
    ) => void,
  ): void;
  GetProducts(
    request: {},
    callback: (
      error: ServiceError | null,
      response: { products: Product[] },
    ) => void,
  ): void;
  GetProductById(
    request: { id: string },
    callback: (
      error: ServiceError | null,
      response: { product: Product },
    ) => void,
  ): void;
  UpdateProduct(
    request: Product,
    callback: (
      error: ServiceError | null,
      response: { product: Product },
    ) => void,
  ): void;
  DeleteProduct(
    request: { id: string },
    callback: (
      error: ServiceError | null,
      response: { success: boolean; message: string },
    ) => void,
  ): void;
}

const PRODUCT_ENDPOINT =
  process.env.PRODUCT_SERVICE_GRPC_ENDPOINT || "localhost:50051";
const client: ProductService = new (stickermProto as any).ProductService(
  PRODUCT_ENDPOINT,
  credentials.createInsecure(),
);

export default client;
