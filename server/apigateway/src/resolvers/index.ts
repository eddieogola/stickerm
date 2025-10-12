import products from "./products";

const resolvers = {
  Query: {
    products: () => products,
  },
};

export default resolvers;
