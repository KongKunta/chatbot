import llama from "@/app/lib/llama";
import { Chat } from "@/components/ui/Chat";

export default function Messages() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chat />
    </main>
  );
}
