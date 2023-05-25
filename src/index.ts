import "./loadEnvironment.js";
import createDebug from "debug";
import app from "./server/app.js";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = createDebug("nftify-api:root");

const port = process.env.PORT ?? 4000;
const mongodbConnection = process.env.MONGODB_CONNECTION;

app.listen(port, () => {
  debug(`Server started at http://localhost:${port}`);
});

if (!mongodbConnection) {
  debug(chalk.red("Missing environment variable"));
  process.exit(1);
}

try {
  await mongoose.connect(mongodbConnection);

  debug(chalk.green("Connected to database"));
} catch (error: unknown) {
  debug(chalk.red(`Error connecting to database: ${(error as Error).message}`));
}
