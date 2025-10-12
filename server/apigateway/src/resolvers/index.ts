import { getProducts } from "../controllers/productController";

const resolvers = {
  Query: {
    products: getProducts,
  },
};

export default resolvers;
