//import { productManagerFS } from "./dao/ProductManagerFS.js";
import { ProductManagerDB } from "./dao/ProductManagerDB.js";

//const ProductFS = new productManagerFS("productos.json");
const ProductBD = new ProductManagerDB();

export default (io) => {
    io.on("connection", (socket) =>{

        socket.on("crearProduct", async (data) =>{
            try{
                await ProductBD.crearProduct(data);
                const products = await ProductBD.getAllProducts();
                socket.emit("publishProducts", products);
            }catch(error) {
                socket.emit("statusError", error.message);
            }

        });

        socket.on("deleteProduct", async (data) =>{
            try{
                const result = await ProductBD.deleteProduct(data.pid);
                socket.emit("publishProducts", result);
            }catch (error) {
                socket.emit("statusError", error.message);
            }
        });
    });

}

