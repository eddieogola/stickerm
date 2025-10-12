import { Client, ServiceError, credentials } from "@grpc/grpc-js";
import { stickermProto } from ".";
import { Product } from "../models/Product";

interface ProductService extends Client {
  CreateProduct(
    request: Product,
    callback: (error: ServiceError | null, response: any) => void,
  ): void;
  GetProducts(
    request: {},
    callback: (error: ServiceError | null, response: any) => void,
  ): void;
  GetProductById(
    request: { id: Pick<Product, "id"> },
    callback: (error: ServiceError | null, response: any) => void,
  ): void;
  UpdateProduct(
    request: {
      id: Pick<Product, "id">;
      productData: Partial<Omit<Product, "id">>;
    },
    callback: (error: ServiceError | null, response: any) => void,
  ): void;
  DeleteProduct(
    request: { id: Pick<Product, "id"> },
    callback: (error: ServiceError | null, response: any) => void,
  ): void;
}

const client: ProductService = new (stickermProto as any).ProductService(
  "localhost:50051",
  credentials.createInsecure(),
);

export default client;
