//
import express from "express";

export const app = express();

// app.use("/", (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "Api test working",
//   });
// });

app.get("/", (req, res, next) => {
  res.send("hello world");
});

//testing api
app.use("/test-api", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Api test working",
  });
});

//unknow api
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});
