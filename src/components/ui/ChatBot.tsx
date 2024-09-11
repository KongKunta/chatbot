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

type ChatBotProps = {
  chatId: string | null;
};

export default function ChatBot({ chatId }: ChatBotProps) {
  const [messages, setMessages] = React.useState([
    { id: 1, content: "Hello! How can I assist you today?", sender: "bot" },
    {
      id: 2,
      content: "Hi! I have a question about your services.",
      sender: "user",
    },
    {
      id: 3,
      content: "Of course! I'd be happy to help. What would you like to know?",
      sender: "bot",
    },
  ]);

  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, content: input, sender: "user" },
      ]);
      setInput("");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center p-4 border-b">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Bot Avatar" />
          <AvatarFallback>BC</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <p className="text-sm text-muted-foreground">Always here to help</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
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
