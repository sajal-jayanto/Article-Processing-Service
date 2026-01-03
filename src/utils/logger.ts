import winston from "winston";
import fs from "fs";
import path from "path";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export const saveJSONToFile = async (data: any, folderPath: string, fileName: string) => {
  if (!fs.existsSync(folderPath)) {
    await fs.mkdirSync(folderPath, { recursive: true });
  }
  const filePath = path.join(folderPath, fileName);
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFileSync(filePath, jsonData, "utf8");
};
