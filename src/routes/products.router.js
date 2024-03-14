import { Router } from "express";

const router = Router();

const products=[];

router.get("/", (req, res) =>{
    res.send(products);

});

router.post("/", (req, res) =>{
       
       const {id, title, description, code, price, status, stock, category, thumbnail}= req.body;
      
       if(!id || !title || !description || !price || !thumbnail || !code || !stock) return res.status(400).send({error: "Error al ingresar el producto, verifique los datoss"});
   
       products.push({id, title, description, code, price, status, stock, category, thumbnail});
       res.status(201).send({message:"El producto se agrego correctamete"});    
});
export default router;