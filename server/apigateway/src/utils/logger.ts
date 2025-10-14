import pino from "pino";
import config from "../config";

const logger = pino({
  level: config.logLevel,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

export default logger;
