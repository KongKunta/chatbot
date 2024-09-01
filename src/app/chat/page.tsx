import connect from "@/app/lib/db";
import Chat from "@/app/lib/modals/chat";
import { redirect } from "next/navigation";

export default async function chat() {
  try {
    connect();

    const chat = new Chat({});
    await chat.save();
    console.log("Chat saved", chat);
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
