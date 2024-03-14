import { Router } from "express";

const router = Router();

const carts=[];

router.get("/", (req, res) =>{
    
    res.send(carts);

});

router.post("/", (req, res) =>{
    
    const {id, title, description, price, stock}= req.body;

    if(!id || !title || !description || !price || !stock) return res.status(400).send({error: "Error al cargar el carrito"});

    carts.push({ id, title, description, price, stock});
    res.status(201).send({message:"Carrito cargado correctamente, finalizar compra"});
    
});
export default router;