const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const app = require("./app");
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Database Connected".blue.bold));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
