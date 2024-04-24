import { ProductManagerDB } from "./dao/ProductManagerDB.js";

const productManager = new ProductManagerDB();

export default (io) => {
    io.on("connection", (socket) =>{

        socket.on("crearProduct", async (data) =>{
            try{
                await productManager.addProduct(data); 
                const products = await productManager.getAllProducts();
                socket.emit("publishProducts", products);
            } catch(error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) =>{
            try{
                const result = await productManager.deleteProduct(data.pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });
    });
}
