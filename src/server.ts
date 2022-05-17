import "dotenv/config";
import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during data source initialization");
    console.error(err);
  });

  app.listen(process.env.PORT || 3000, () => {
    if (!process.env.PORT) {
      console.log("Running at 3000");
    }
  });
})();
