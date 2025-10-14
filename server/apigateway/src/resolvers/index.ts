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
    products: () => getProducts(),
    product: (_: any, args: { id: string }) => getProductById({ id: args.id }),
  },
  Mutation: {
    createProduct: async (_: any, args: Product): Promise<Product | Error> =>
      createProduct(args),
    updateProduct: async (
      _: any,
      args: {
        id: Pick<Product, "id">;
        productData: Partial<Omit<Product, "id">>;
      },
    ) => await updateProduct(args.id, args.productData),
    deleteProduct: async (_: any, args: Pick<Product, "id">) =>
      await deleteProduct(args),
  },
};

export default resolvers;
