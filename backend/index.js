// app.js

const express = require("express");
const session = require('express-session');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/UserRoutes");
const productRoute = require("./routes/product.route.js");
const itemRoutes  =  require("./routes/itemRoutes.js");
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const mongoUrl = process.env.MONGO_URL;
const  SupplierRoutes = require("./routes/SupplierRoutes");
const SupplierOrderRoutes = require("./routes/SupplierOrderRoutes");
const promoCodeRoutes = require("./routes/promoCodeRoutes"); 




const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


mongoose
  .connect(mongoUrl)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));


  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);
app.use("/Savindi", UserRoutes);
app.use("/Shakya", itemRoutes);
app.use("/api/products", productRoute);
app.use("/api/supplier",SupplierRoutes)
app.use("/api/supplier-order",SupplierOrderRoutes)
app.use(promoCodeRoutes);


const Port = 8000;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
