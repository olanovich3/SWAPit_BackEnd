const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user.model");

const MONGO_URI =
  "mongodb+srv://admin:neoland@cluster0.6daslri.mongodb.net/SWAPITBACK?retryWrites=true&w=majority";

const UsersDataSet = [
  {
    name: "Tomas",
    lastname: "Turbado",
    location: "madrid",
    image: "",
    gender: "male",
    birthdate: "1999-2-12",
    email: "tomasturbado@gmail.com",
    password: "To123456.",
    products: ["64109a7d9dd549c633c67dc8"],
    favourites: ["64109a7d9dd549c633c67dc8"],
    comments: [],
    chat: [],
  },
  {
    name: "Ana",
    lastname: "Boweles",
    location: "barcelona",
    image: "",
    gender: "female",
    birthdate: "1986-5-22",
    email: "anaboweles@gmail.com",
    password: "To123456.",
    products: [],
    favourites: [],
    comments: [],
    chat: [],
  },
];

const UserDocuments = UsersDataSet.map((user) => new User(user));
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allUsers = await User.find();
    if (allUsers.length) {
      await User.collection.drop();
      console.log("coleccion borrada");
    }
  })
  .catch((err) => console.log("Error borrando producto", err))
  .then(async () => {
    await User.insertMany(UserDocuments);
    console.log("coleccion creada");
  })
  .catch((err) => console.log("error insertando producto", err))
  .finally(() => mongoose.disconnect());
