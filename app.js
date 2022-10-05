const express = require("express");
const app = express();
const cors = require("cors");

// routes
const productRoutes = require("./routes/product.routes");
const brandRoutes = require("./routes/brand.routes");
const categoryRoutes = require("./routes/category.routes");
const supplierRoutes = require("./routes/supplier.routes");
const stockRoutes = require("./routes/stock.routes");
const storeRoutes = require("./routes/store.routes");
const userRoutes = require("./routes/user.routes");

// middleware
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Inventory Management Route");
});

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/supplier", supplierRoutes);
app.use("/api/v1/stock", stockRoutes);
app.use("/api/v1/store", storeRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app;