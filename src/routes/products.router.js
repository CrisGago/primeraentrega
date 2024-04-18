import { Router } from 'express';
//import ProductManagerFS from "../dao/ProductManagerFS.js";
import { ProductManagerDB } from "../dao/ProductManagerDB.js";
import { uploader } from "../utils/multerUtil.js";

const router = Router();

//const productManager = new ProductManagerfs("./src/productos.json");
const productManager = new ProductManagerDB();

router.get("/", async (req, res) => {
    try {
        const result = await productManager.getAllProducts();
        res.send( {
            status: "success",
            payload: result
        })
    } catch (error) {
        console.error("Error al traer los productos:", error.message);
        res.status(500).send({ error: "Error al traer los productos" });
    }

});

router.get("/", async (req, res) => {
    try {

        const result = await productManager.getProductById(req.params.id);
        res.send( {
            status: "success",
            payload: result
        });
               
    }   catch (error) {
        res.status(400).send({
              status: "success",
              payload: result
            });
    }
       
});

router.post('/', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await productManager.addProduct(req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:pid', uploader.array('thumbnails', 3), async (req, res) => {

    if (req.files) {
        req.body.thumbnails = [];
        req.files.forEach((file) => {
            req.body.thumbnails.push(file.filename);
        });
    }

    try {
        const result = await productManager.updateProduct(req.params.pid, req.body);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:pid', async (req, res) => {

    try {
        const result = await productManager.deleteProduct(req.params.pid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;