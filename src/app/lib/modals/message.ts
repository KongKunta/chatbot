import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "chat",
    required: true,
  },
  senderId: String,
  message: {
    type: String,
    required: true,
  },
});

const message = models.message || model("message", messageSchema);

export default message;
