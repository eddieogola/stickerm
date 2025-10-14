import dotenv from "dotenv";
import client from "../grpc/productService";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  whitelistIPs: string[];
  productClient: typeof client;
  logLevel: string;
  productServiceEndpoint: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  whitelistIPs: process.env.WHITELIST_IPS?.split(",") || [],
  productClient: client,
  logLevel: process.env.LOG_LEVEL || "info",
  productServiceEndpoint:
    process.env.PRODUCT_SERVICE_GRPC_ENDPOINT || "localhost:50051",
};

export default config;
