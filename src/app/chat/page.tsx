import connect from "@/app/lib/db";
import Chat from "@/app/lib/modals/chat";
import message from "@/app/lib/modals/message";
import { redirect } from "next/navigation";

export default async function chat() {
  let chatId: any = "";
  try {
    connect();
    const chat = new Chat({});
    await chat.save();
    console.log("Chat saved", chat);
    chatId = chat._id;
    const msg = new message({
      chatId: chatId,
      senderId: "system",
      message:
        "Hej og velkommen! Jeg er her for at hjælpe dig med alt, hvad du har brug for. Hvad kan jeg gøre for dig i dag?",
    });
    await msg.save();
    console.log("Message saved", msg);
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
  }
  if (true) {
    redirect(`/chat/${chatId}`);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
