import express from "express";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.Router.js";
import __dirname from "./utils/utilsConst.js";
import { Server } from "socket.io";
import websocket from "./websocket_dos.js";
// import ProductManager from "./dao/CartManagerFS.js";
// import CartManager from "./dao/ProductManagerFS.js";
import mongoose from "mongoose";



const app = express();
// const uri = "mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(uri);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//const PM = new ProductManager("./src/productos.json");
//const CM = new CartManager("./src/carrito.json");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", viewsRouter);
app.use("/", viewsRouter);

const conexion = async() =>{
    try{
        await mongoose.connect("mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectando con la bbdd MongoAtlas");
    }catch (error){
        console.log("Fallo la conexión");
    }
}
conexion();

const PORT = 8080;
const httpServer = app.listen(PORT, () =>{
    console.log(`Start server PORT ${PORT}`);
});
const io = new Server(httpServer);
websocket(io);

