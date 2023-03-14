const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("../models/product.model");

const MONGO_URI =
  "mongodb+srv://admin:neoland@cluster0.6daslri.mongodb.net/SWAPITBACK?retryWrites=true&w=majority";

const ProductsDataSet = [
  {
    title: "Mario Kart",
    images: [
      "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.todocoleccion.net%2Fvideojuegos-consola-gamecube%2Fcaratula-manual-originales-mario-kart-double-dash-nintendo-gamecube-pal-espana~x329339698&psig=AOvVaw1ZxEHH9a-qT7w8QX4sRIqJ&ust=1678895376900000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCID2pubi2_0CFQAAAAAdAAAAABAE",
      "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.todocoleccion.net%2Fvideojuegos-consola-gamecube%2Fcaratula-manual-originales-mario-kart-double-dash-nintendo-gamecube-pal-espana~x329339698&psig=AOvVaw1ZxEHH9a-qT7w8QX4sRIqJ&ust=1678895376900000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCID2pubi2_0CFQAAAAAdAAAAABAE",
    ],
    description:
      " Intercambio de videojuegos de mariokart por algunos del año 2000",
    location: "madrid",
    category: "videogames",
    condition: "new",
    status: "available",
  },
];

const ProductDocuments = ProductsDataSet.map((product) => new Product(product));
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allProducts = await Product.find();
    if (allProducts.length) {
      await Product.collection.drop();
      console.log("coleccion borrada");
    }
  })
  .catch((err) => console.log("Error borrando producto", err))
  .then(async () => {
    await Product.insertMany(ProductDocuments);
    console.log("coleccion creada");
  })
  .catch((err) => console.log("error insertando producto", err))
  .finally(() => mongoose.disconnect());
