"use client";

import { Philosopher } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/ChatMessage";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  philosopher: Philosopher;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  philosopher,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={philosopher.src}
        role="system"
        content={`Hello, I am ${philosopher.name}, ${philosopher.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          key={message.content}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && (
        <ChatMessage role="system" src={philosopher.src} isLoading />
      )}
      <div ref={scrollRef} />
    </div>
  );
};
