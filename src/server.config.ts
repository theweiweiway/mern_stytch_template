require("dotenv").config();

const env: "development" | "preview" | "production" =
  (process.env.ENV as any) || "development";

const serverConfig = {
  env,
};

export default serverConfig;
