import express from "express";
import cors from "cors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@as-integrations/express5";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import resolvers from "@/src/resolvers";
import { readFileSync } from "fs";

const whitelist = process.env.WHITELIST?.split(",") || [];
const app = express();

const typeDefs = gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
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
  })
);

app.use(express.json());

app.get("/healthz", (req, res) => {
  res.send("API Gateway is healthy");
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
