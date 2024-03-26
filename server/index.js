import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signupRouter from "./routes/signup.route.js";
import signinRouter from "./routes/signin.route.js";
import googleRouter from "./routes/google.route.js";
import cookieParser from "cookie-parser";
import signoutRouter from "./routes/signout.route.js";
import listingRouter from "./routes/listing.route.js";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server started in port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/server/user", userRouter);
app.use("/server", signupRouter);
app.use("/server", signinRouter);
app.use("/server", googleRouter);
app.use("/server", signoutRouter);
app.use("/server/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
