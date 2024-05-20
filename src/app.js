import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import mongosePaginate from "mongoose-paginate-v2";
import websocket from "./websocket.js";
import cookieParser from "cookie-parser";


import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.Router.js";
import __dirname from "./utils/utilsConst.js";
import productModel from "./dao/models/productModel.js";
import  passport   from "./config/passport.js";
import authRoutes from "./routes/auth.js";

//import websocket from "./websocket.js";
// import ProductManager from "./dao/CartManagerFS.js";
// import CartManager from "./dao/ProductManagerFS.js";

productModel.paginate = mongosePaginate;

const app = express();

//Mongo connection

// const uri = "mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(uri);

const conexion = async() =>{
    try{
        await mongoose.connect("mongodb+srv://crisgh:eC0der2024@cluster0.x8bucze.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conectando con la bbdd MongoAtlas");
    }catch (error){
        console.log("Fallo la conexión");
    }
}
conexion();

//handlebars
app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//passaport
//passport();
app.use(passport.initialize());


//const PM = new ProductManager("./src/productos.json");
//const CM = new CartManager("./src/carrito.json");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", viewsRouter)
app.use("/products", viewsRouter);
app.use("/carts", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/auth", authRoutes);
app.use("/api/messages", viewsRouter);
app.use("/", viewsRouter);


//Local connection 
const PORT = 8080;
const httpServer = app.listen(PORT, () =>{
    console.log(`Start server PORT ${PORT}`);
});
//websocket
const io = new Server(httpServer);
websocket(io);

