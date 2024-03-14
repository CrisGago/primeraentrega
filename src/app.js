import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import ProductManager from "./ProductManager.js";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PM = new ProductManager("./src/productos.json");



app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// Obtener todos los productos
app.get("/api/products", async (req, res) => {
    try {
        const products = await PM.getProducts();
        res.status(200).json(products);
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

