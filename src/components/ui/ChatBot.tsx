"use client";
import * as React from "react";
import { Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

export default function ChatBot({
  chat,
  addMessage,
  chatId,
}: {
  chat: Message[];
  addMessage: (chatId: string, msg: string) => Promise<void>;
  chatId: string;
}) {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>(chat);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log("ChatBot rendered with chat:", chat);
    setMessages(chat);
  }, [chat]);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        await addMessage(chatId, message);
        const newMessage: Message = {
          id: Date.now().toString(), // Temporary ID
          chatId: chatId,
          senderId: "user",
          message: message,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
      } catch (error) {
        console.error("Error adding message:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  const getAvatarFallback = (sender: string) => {
    if (!sender) return "?";
    return sender.charAt(0).toUpperCase();
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold">Chat</h2>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="mb-4 flex items-start">
                <Avatar className="mr-2">
                  <AvatarImage
                    src={
                      msg.senderId ? `/avatars/${msg.senderId}.png` : undefined
                    }
                    alt={msg.senderId || "Unknown"}
                  />
                  <AvatarFallback>
                    {getAvatarFallback(msg.senderId)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`p-3 rounded-lg ${
                    msg.senderId === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
