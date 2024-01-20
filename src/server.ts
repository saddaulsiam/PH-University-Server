import app from "./app";
import colors from "colors";
import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";

let server: Server;

(async () => {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log(colors.red("Database connection is successful 🛢"));
    });

    app.listen(config.port, () => {
      console.log(colors.yellow(`Server is running on port ${config.port} 😎`));
    });
  } catch (err) {
    console.log(err);
  }
})();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
