import { getProducts, getProductById } from "../controllers/productController";
import {} from "graphql";

const resolvers = {
  Query: {
    products: () => getProducts(),
    product: (_: any, args: { id: string }) => getProductById({ id: args.id }),
  },
};

export default resolvers;
