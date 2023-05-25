import "./loadEnviroment.js";
import createDebug from "debug";
import app from "./server/app.js";

const debug = createDebug("nftify-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(`Server started at http://localhost:${port}`);
});
