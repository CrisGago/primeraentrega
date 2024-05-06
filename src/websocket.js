//import { productManagerFS } from "./dao/ProductManagerFS.js";
import { ProductManagerDB } from "./dao/ProductManagerDB.js";
import { addMessages } from "./dao/messageManager.js";
import { getMessages } from "./dao/messageManager.js";



//const ProductFS = new productManagerFS("productos.json");
const ProductBD = new ProductManagerDB();

export default (io) => {
    io.on("connection", (socket) =>{

        socket.on("crearProduct", async (data) =>{
            try{
                await ProductBD.addProduct(data);
                const products = await ProductBD.getAllProducts();
                io.emit("publishProducts", products);
            }catch(error) {
                socket.emit("statusError", error.message);
            }

        });

        socket.on("deleteProduct", async (data) =>{
            try{
                const result = await ProductBD.deleteProduct(data.pid);
                io.emit("publishProducts", result);
            }catch (error) {
                socket.emit("statusError", error.message);
            }
        });
    });
//message


socket.on("messages", async data => {
    // Guardar el mensaje en la base de datos
    await addMessages(data.user, data.messages);
    // Emitir el mensaje a todos los clientes conectados
    io.emit("messages", data);
});


socket.on("userConnect", async user => {
    // Obtener todos los mensajes almacenados
    const mensajes = await getMessages();
    // Emitir los mensajes al usuario que se conecta
    socket.emit("messageLogs", mensajes);
    // Notificar a todos los usuarios sobre el nuevo usuario conectado
    io.emit("newUser", user);
    
});
};
