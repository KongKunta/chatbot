"use server";
import connect from "@/app/lib/db";
import message from "@/app/lib/modals/message";
import { time } from "console";
import mongoose from "mongoose";

export async function queryDB(chatId: string) {
  console.log("Attempting to query database for chatId:", chatId);
  try {
    await connect();
    console.log("Database connected successfully");

    const messages = await message.find({ chatId: chatId }).lean().exec();
    console.log(`Found ${messages.length} messages for chatId: ${chatId}`);

    return messages;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}

export async function addMessage(
  chatId: string,
  msg: string,
  senderId: string
) {
  const newMessage = new message({
    chatId: chatId,
    senderId: senderId,
    message: msg,
    timestamp: new Date(),
  });
  await newMessage.save();
}
