import dotenv from "dotenv";
import client from "../grpc/productService";
import logger from "../utils/logger";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  whitelistIPs: string[];
  productClient: typeof client;
  logLevel: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  whitelistIPs: process.env.WHITELIST_IPS?.split(",") || [],
  logLevel: process.env.LOG_LEVEL || "info",

  productClient: client,
};

export default config;
