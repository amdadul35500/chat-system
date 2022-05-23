const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const userRouter = require("./routers/usersRouter");
const messageRouter = require("./routers/messageRouter");
const conversationRouter = require("./routers/conversationRouter");
const { checkLogin } = require("./middlewares/checkLogin");
const httpServer = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

// socket io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("socket.io is connected");
  socket.on("disconnect", () => {
    console.log("socket.io is disconnect");
  });
});
global.io = io;

const PORT = process.env.PORT || 5000;
dotenv.config();

// request parsers
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// routing setup
app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversation", conversationRouter);

// checkExistCookie
app.get("/api/coockie", checkLogin);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}!`);
});
