import { Router } from 'express';
//import { ProductManagerFS } from '../dao/ProductManagerFS.js';
import { ProductManagerDB } from "../dao/ProductManagerDB.js";
import { MessageManager } from '../dao/messageManager.js';




const router = Router();
//const productManager = new ProductManagerFS('products.json');
const productManager = new ProductManagerDB();
const messageManager  = new MessageManager();
const nessage = [];


// Ruta para renderizar la vista de productos
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

// Ruta para renderizar la vista de productos en tiempo real
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

// Ruta para renderizar la vista del chat
router.get('/messages', async (req, res) => {
    res.render(
        'message',
        {
            title: 'Chat Contacto',
            style: 'message.css',
            messages: await messageManager.getMessages()
        }
    )
});

export default router;
