import messageModel from "./models/messageModel.js";

class MessageManager {
    // constructor() {
    //     this.messageModel = messageModel; // Asigna messageModel a una propiedad de la clase
    // }

    async getMessages() {
        try {
            return await messageModel.find().lean(); 
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al traer los mensajes');
        }
    }

    async addMessages(data) {
        const { user, message } = data;
        try {
            if (!user || !message) {
                throw new Error("Error al guardar el mensaje");
            }
            await messageModel.create({ user, message });
            return await this.getMessages();
        } catch (error) {
            console.error(error.message);
            throw new Error("No se pudo guardar el mensaje"); 
        }
    }

};

export { MessageManager };
