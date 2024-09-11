"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChatBot from "./ChatBot";

// Add this type definition

// Make sure your ChatBot component is expecting this prop type
// If it's in a separate file, you'll need to update it there

export function Chat() {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop() || null;

  return <ChatBot chatId={chatId} />;
}
