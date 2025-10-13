import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import {} from "graphql";
import { Product } from "../models/Product";

const resolvers = {
  Query: {
    products: () => getProducts(),
    product: (_: any, args: { id: string }) => getProductById({ id: args.id }),
  },
  Mutation: {
    createProduct: (_: any, args: { productData: Product }) =>
      createProduct(args.productData),
    updateProduct: (
      _: any,
      args: {
        id: Pick<Product, "id">;
        productData: Partial<Omit<Product, "id">>;
      },
    ) => updateProduct(args.id, args.productData),
    deleteProduct: (_: any, args: { id: Pick<Product, "id"> }) =>
      deleteProduct(args.id),
  },
};

export default resolvers;
