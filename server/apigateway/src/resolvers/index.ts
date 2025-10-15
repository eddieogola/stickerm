import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { Product } from "../models/Product";

const resolvers = {
  Query: {
    products: (): Promise<Product[] | Error> => getProducts(),
    product: (_: any, args: { id: string }): Promise<Product | Error> =>
      getProductById(args.id),
  },
  Mutation: {
    createProduct: (_: any, args: Product): Promise<Product | Error> =>
      createProduct(args),
    updateProduct: async (_: any, args: Product): Promise<Product | Error> =>
      updateProduct(args),
    deleteProduct: (
      _: any,
      args: { id: string },
    ): Promise<{ status: "success" | "failure"; message: string } | Error> =>
      deleteProduct(args.id),
  },
};

export default resolvers;
