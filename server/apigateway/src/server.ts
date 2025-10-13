import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { readFileSync } from "fs";
import { join } from "path";

import logger from "./utils/logger";
import resolvers from "./resolvers";
import productRoutes from "./routes/product";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./config";

const app = express();

export async function startServer() {
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
    cors({
      origin: (origin, callback) => {
        if (config.whitelistIPs.indexOf(origin as string) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server),
  );
  app.use(logger);

  app.get(`${config.apiPrefix}/healthz`, (req, res) => {
    req.log.info("Health check endpoint hit");
    res.send("API Gateway is healthy");
  });

  app.use(`${config.apiPrefix}/products`, productRoutes);

  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`🚀 Server ready at: http://localhost:${config.port}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${config.port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

export default app;
