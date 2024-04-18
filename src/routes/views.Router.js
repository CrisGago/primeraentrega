import { Router } from 'express';
//import { ProductManagerFS } from '../dao/ProductManagerFS.js';
import { ProductManagerDB } from "../dao/ProductManagerDB.js";

const router = Router();
//const productManager = new ProductManagerFS('products.json');
const productManager = new ProductManagerDB();

router.get('/', async (req, res) => {
    res.render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: await productManager.getAllProducts()
        }
    )
});

router.get('/realtimeproducts', async (req, res) => {
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: await productManager.getAllProducts()
        }
    )
});

export default router;