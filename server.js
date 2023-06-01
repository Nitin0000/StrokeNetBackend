const mongoose = require("mongoose");
const app = require("./app");
require("dotenv/config");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Not connected");
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}/`);
});
