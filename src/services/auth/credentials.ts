import serverConfig from "../../server.config";

export const authProjectId = serverConfig.env === "production" ? "" : "";

export const authSecret =
  serverConfig.env === "production" ? process.env.STYTCH_SECRET! : "";
