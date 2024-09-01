import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

const chatSchema = new Schema({});

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
