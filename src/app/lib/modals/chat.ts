import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({});

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
