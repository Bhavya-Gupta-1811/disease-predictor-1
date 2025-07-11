require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "https://disease-predictor-1-4.onrender.com",
  methods: "GET, POST, PUT, DELETE, PATCH,HEAD",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json()); //we are using middleware to pass json from the request

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
