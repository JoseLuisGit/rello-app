import { createLogger, format, transports } from "winston";
import context from "./context";

const consoleTransport = new transports.Console({
  level: process.env.LOG_LEVEL ?? "info",
});

function contextToString(contextObject: ArrayLike<unknown>): string {
  let output = "";
  for (const [key, value] of Object.entries(contextObject)) {
    if (key == "id" || key.startsWith("_")) {
      continue;
    }
    output += `${key}="${value}" `;
  }
  return output;
}

const logLineFormat = format.printf(({ level, message, timestamp }) => {
  const namespace = context.getContext();

  let logLine = `@timestamp=${timestamp} @level=${level} @message=${message}`;
  if (namespace?.active) {
    logLine += ` ${contextToString(namespace.active)}`;
  }
  return logLine;
});

const logger = createLogger({
  transports: [consoleTransport],
  format: format.combine(format.timestamp(), logLineFormat),
});

export default logger;
