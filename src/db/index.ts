import mongoose from "mongoose";
import serverConfig from "../server.config";

const initializeDb = async () => {
  console.log("connecting to " + serverConfig.env + " ...");

  const credentials =
    serverConfig.env === "production"
      ? `server:${process.env.MONGODB_SECRET}`
      : "dev:dev";

  const getDbString = () => {
    if (serverConfig.env === "development") return "";
    if (serverConfig.env === "preview") return "";
    if (serverConfig.env === "production") return "";
    return "";
  };

  mongoose.connect(`mongodb+srv://${credentials}@${getDbString()}`);

  mongoose.connection.on("open", (_) => {
    console.log("connected to: " + serverConfig.env);
  });

  mongoose.connection.on("error", (err) => {
    console.log("error");
    console.log(err);
  });

  mongoose.connection.on("disconnected", (err) => {
    console.log("disconnected");
    console.log(err);
  });
};

const db = { initialize: initializeDb };

export default db;
