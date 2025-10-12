import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { join } from "path";

import resolvers from "./resolvers";
import productRoutes from "./routes/product";
import { errorHandler } from "./middlewares/errorHandler";

const whitelist = process.env.WHITELIST?.split(",") || [];
const app = express();

async function startServer() {
  const typeDefs = gql(
    readFileSync(join(__dirname, "schema.graphql"), {
      encoding: "utf-8",
    }),
  );

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    }),
  );

  app.use(express.json());

  app.use("/api", productRoutes);

  app.use(errorHandler);

  app.get("/healthz", (req, res) => {
    res.send("API Gateway is healthy");
  });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

export default app;
