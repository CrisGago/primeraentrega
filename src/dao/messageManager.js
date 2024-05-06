import messageModel from "./models/messageModel.js";


class MessageManager {
    constructor() {
        this.messages = messageModel;
    }
    
    async getMessages() {
        try {
            const messages = await this.messages.find();
            return messages;
        } catch (error) {
            console.log(error);
        }
    }
 
    
    async addMessage(user, message) {
        try {
            const newMessage = new this.messages({ user, messages: message });
            await newMessage.save();
            return newMessage;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getMessageById(id) {
        try {
            const message = await this.messages.findById(id);
            return message;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateMessage(id, message) {
        try {
            const updatedMessage = await this.messages.findByIdAndUpdate(id, message, {
                new: true,
            });
            return updatedMessage;
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteMessage(id) {
        try {
            const message = await this.messages.findByIdAndDelete(id);
            return message;
        } catch (error) {
            console.log(error);
        }
    }
}
   

export default MessageManager;
