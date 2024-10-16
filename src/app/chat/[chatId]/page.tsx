import ChatBot from "@/components/ui/ChatBot";
import { queryDB, addMessage } from "./actions";
import llama from "@/app/lib/llama";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { chatId: string } }) {
  const chatId = params.chatId;
  const chat = await queryDB(chatId);
  if (chat[chat.length - 1].senderId === "user") {
    const llamaResponse = await llama(chat[chat.length - 1].message);

    await addMessage(chatId, llamaResponse, "system");

    revalidatePath("/chat/" + chatId);
  }

  return <ChatBot chat={chat} addMessage={addMessage} chatId={chatId} />;
}
