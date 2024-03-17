import { Router } from 'express';
import ProductManager from "../ProductManager.js";

const router = Router();

const productManager = new ProductManager("./src/productos.json");

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.error("Error al traer los productos:", error.message);
        res.status(500).send({ error: "Error al traer los productos" });
    }

});

router.post("/", async (req, res) => {
    try {

        const {title, description, code, price, stock, category, thumbnail } = req.body;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return res.status(400).send({error: "Error al ingresar el producto"});
        }
        
        const message = await productManager.addProduct(title, description, code,price, stock, category, thumbnail);
        res.status(201).send({message});
 
    }   catch (error) {
        console.error("Error al ingresar el producto:", error.message);
        res.status(500).send({error: "Error al ingresar el producto"});
    }
       
});
export default router;