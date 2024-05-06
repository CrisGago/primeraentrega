import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    messages: {
        type: String,
        require: true
    }
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;