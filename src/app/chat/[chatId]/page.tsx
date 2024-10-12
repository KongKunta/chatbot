import ChatBot from "@/components/ui/ChatBot";
import { queryDB, addMessage } from "./actions";

export default async function Page({ params }: { params: { chatId: string } }) {
  const chatId = params.chatId;
  console.log("Fetching chat for chatId:", chatId);
  const chat = await queryDB(chatId);
  console.log("Chat data received:", chat);

  return <ChatBot chat={chat} addMessage={addMessage} chatId={chatId} />;
}
