import express from "express";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.Router.js";
import __dirname from "./utils/utilsConst.js";
import { Server } from "socket.io";
import websocket from "./websocket.js";
import ProductManager from "./dao/CartManagerFS.js";
import CartManager from "./dao/ProductManagerFS.js";
import mongoose from "mongoose";


const app = express();
const uri = "mongodb+srv://cris7gh:C0der_2024@cluster0.x8bucze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PM = new ProductManager("./src/productos.json");
const CM = new CartManager("./src/carrito.json");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Obtener todos los productos
app.get("/api/products", async (req, res) => {
    try {
        const products = await PM.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener los productos hasta X limite
 app.get("/api/products", async (req, res) => {
     try {
         const {limit} = req.query;
         let products = await PM.getProducts()
         if(limit){
             const limitProducts = products.slice(0, limit);
             return res.json(limitProducts);
         }
         return res.json(products);
        
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 });

// Agregar un nuevo producto
app.post("/api/products", async (req, res) => {
    try {
        const response = await PM.addProduct(req.body);
        res.status(201).json({ message: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un producto existente
app.put("/api/products/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
        const response = await PM.updateProduct(uid, req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

// Eliminar un producto
app.delete("/api/products/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
        const response = await PM.deleteProduct(uid);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

