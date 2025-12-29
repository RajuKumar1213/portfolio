"use client";

import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  X,
  Send,
  MessageCircle,
  Maximize2,
  Minimize2,
  Paperclip,
  FileText,
  Plus,
  Image as ImageIcon,
  FileUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebarStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function getPersistentDeviceId() {
  const KEY = "device_id";

  let id = localStorage.getItem(KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }

  return id;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const WELCOME_MESSAGE =
    "Welcome to the Jharkhand E-Governance AI Assistant. Feel free to ask any questions about the portal.";
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { isOpen } = useSidebarStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, []);

  useEffect(() => {
    const sessionId = getPersistentDeviceId();
    fetch(`http://localhost:8000/api/chat/history/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Insert a welcome message when no history exists
  useEffect(() => {
    if (messages.length === 0) {
      const welcome: Message = { role: "assistant", content: WELCOME_MESSAGE };
      setMessages([welcome]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const sessionId = getPersistentDeviceId();

    try {
      const response = await fetch(`http://localhost:8000/api/chat/ask`, {
        // const response = await fetch(`http://localhost:8000/api/chat/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ query: input, sessionId }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // create empty assistant message FIRST
      const assistantMessage: Message = {
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let done = false;

      // mark generating once before reading the stream

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (!value) continue;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const token = line.replace("data: ", "");

            // 🚫 ignore stream end marker only
            if (token === "done" || token === "[DONE]") continue;

            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;

              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content + token,
              };

              // Scroll after state update
              setTimeout(scrollToBottom, 0);

              return updated;
            });
          }
        }
      }
    } catch (error) {
      console.error("api error", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to get response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-20 px-6">
      {/* Header */}
      {/* <div className="relative shrink-0 border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/images/bot.png" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  AI Assistant
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      <div ref={messagesContainerRef} className="overflow-y-auto p-4 pb-32">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <p className="text-xs sm:text-sm font-medium">
                Start a conversation
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask me anything!
              </p>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-6 w-6 shrink-0 mt-1">
                  <AvatarImage src="/images/ai2.png" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[75%] rounded-xl py-2 px-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <div className="text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-4 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-4 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-muted rounded-xl px-4 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className={`px-8 py-2 bg-background fixed bottom-4
            ${isOpen ? "left-64" : "left-24"}
            right-4 max-w-4xl mx-auto rounded-full border shadow-lg
            transition-all duration-300 ease-in-out 
        `}
      >
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploadedFile(file);
            }}
          />
          <input
            ref={imageInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploadedFile(file);
            }}
          />
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="rounded-full h-12 w-12 "
              onClick={() => setShowUploadModal(!showUploadModal)}
            >
              <Plus className="h-10 w-10" />
            </Button>
            {showUploadModal && (
              <Card className="absolute bottom-14 left-0 p-2 w-48 shadow-lg">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    imageInputRef.current?.click();
                    setShowUploadModal(false);
                  }}
                >
                  <ImageIcon className="h-4 w-4" />
                  Upload Image
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowUploadModal(false);
                  }}
                >
                  <FileUp className="h-4 w-4" />
                  Upload Document
                </Button>
              </Card>
            )}
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;
