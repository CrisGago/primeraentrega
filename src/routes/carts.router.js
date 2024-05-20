import { Router } from "express";
//import CartManager from "../dao/CartManagerFS.js";
import { CartManagerDB } from "../dao/CartManagerDB.js";
import { ProductManagerDB } from "../dao/ProductManagerDB.js";
import { uploader } from "../utils/multerUtil.js";

const router = Router();
//const manager = new CartManager('./src/carrito.json');
const cartManager = new CartManagerDB();


router.get('/', async (req, res) => {
    try {
        const result = await cartManager.getAllcarts();
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.error("Error al traer carrito:", error.message);
        res.status(500).send({ error: "Error al traer carrito" });
    }

});

router.post('/', async (req, res) => {
    try {
        let status = await cartManager.addCart();
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cartProducts = await cartManager.getProductsOfCartById(cid);
    if (cartProducts) {
        res.send({ status: "success", payload: cartProducts });
    } else {
        res.status(404).json({ 'error': 'Carrito no encontrado' });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        console.log('ID del carrito:', cid);
        console.log('ID del producto:', pid);

        // Llama a la función para agregar el producto al carrito
        let status = await cartManager.addProductToCart(cid, pid);
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        // Obtener la cantidad del producto del cuerpo de la solicitud
        const { quantity } = req.body;

        console.log('ID del carrito:', cid);
        console.log('ID del producto:', pid);
        console.log('Cantidad del producto:', quantity);

        // Llama a la función para actualizar la cantidad del producto en el carrito
        const cart = await cartManager.updateProductQuantity(cid, pid, quantity);

        res.status(cart.code).json({ status: cart.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

export default router;