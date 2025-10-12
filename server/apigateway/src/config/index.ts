import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  whitelistIPs: string[];
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  whitelistIPs: process.env.WHITELIST_IPS?.split(",") || [],
};

export default config;
