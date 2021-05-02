const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
//USING ENVIRONMENT VARIABLES
dotenv.config();

//CONNECTING TO DATABASE
dbConnect();

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/inoice", invoiceRoutes);
app.use("/api/v1/user/clients", clientRoutes);

app.get("/", (req, res) => {
  res.send("Invoicing and payment reminder API");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server started on: ${port}`);
});
