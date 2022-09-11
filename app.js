const express = require("express");
const app = express();
const cors = require("cors");

// routes
const productRoutes = require("./routes/product.routes");

// middleware
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Inventory Management Route");
});

app.use("/api/v1/product", productRoutes);

module.exports = app;