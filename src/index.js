const express = require(`express`);
const cors = require(`cors`);
const dotenv = require("dotenv");
const connect = require(`./utils/connect`);
const { configCloudinary } = require("./middlewares/files.middleware");
const UserRoutes = require("./api/routes/users.routes");
const ProductsRoutes = require("./api/routes/products.routes");
const CommentsRoutes = require("./api/routes/comments.routes");
const ChatsRoutes = require("./api/routes/chats.routes");
const RequestRoutes = require("./api/routes/Request.routes");
const ChatBoxRoutes = require("./api/routes/chatBox.routes");

dotenv.config();
//CONFIG CLOUDINARYYYYYYYYY
configCloudinary();

const PORT = process.env.PORT || 8081;
const server = express();
//connect to DB
connect();

//HEADERS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//CORS
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//PARSER
server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));
//ROUTES

server.use("/api/v1/users", UserRoutes);
server.use("/api/v1/products", ProductsRoutes);
server.use("/api/v1/user/comments/", CommentsRoutes);
server.use("/api/v1/chat", ChatsRoutes);
server.use("/api/v1/request", RequestRoutes);
server.use("/api/v1/inbox", ChatBoxRoutes);
//Route not found
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  return next(error);
});
//Hide tech
server.disable("x-powered-by");

//Listen
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
