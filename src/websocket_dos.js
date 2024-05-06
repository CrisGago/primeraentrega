import { ProductManagerDB } from "./dao/ProductManagerDB.js";
import MessageManager from "./dao/messageManager.js";
import  addMessage  from "./dao/messageManager.js";
import  getMessages  from "./dao/messageManager.js";

const productManager = new ProductManagerDB();
const messageManager = new MessageManager();
const messages = [];

export default (io) => {
    io.on("connection", (socket) => {

        socket.on("crearProduct", async (data) => {
            try {
                await productManager.addProduct(data);
                const products = await productManager.getAllProducts();
                socket.emit("publishProducts", products);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) => {
            try {
                const result = await productManager.deleteProduct(data.pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        //chat 

        socket.on("messages", async data => {
            try {
                await messageManager.addMessage(data.user, data.messages);
                io.emit("messages", data);
            } catch (error) {
                console.error("Error al guardar el mensaje:", error);
            }
        });

        socket.on("userConnect", async user => {
            try {
                const mensajes = await messageManager.getMessages();
                socket.emit("messagesLogs", mensajes);
                io.emit("newUser", user);
            } catch (error) {
                console.error("Error al obtener los mensajes:", error);
            }
            socket.on("disconnect", () => {
                console.log("Cliente desconectado");
            });
        });
    });
};
