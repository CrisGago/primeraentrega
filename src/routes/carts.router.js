import { Router } from "express";

const router = Router();

const carts=[];

router.get("/", (req, res) =>{
    
    res.send(carts);

});

router.post("/", (req, res) =>{
    // hago lo siguiente para ver que funcione lo tengo que sustituir
    const {name, species}= req.body;

    if(!name || !species) return res.status(400).send({error: "PROBANDO CONEXION CARTS"});

    carts.push({ name, species});
    res.status(201).send({message:"probando conexion carts"});
    
});
export default router;