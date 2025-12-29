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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const WELCOME_MESSAGE =
    "Welcome to the Jharkhand E-Governance AI Assistant. Feel free to ask any questions about the portal.";
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatModalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

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

  // Insert a welcome message when the chat is opened and no history exists
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Message = { role: "assistant", content: WELCOME_MESSAGE };
      setMessages([welcome]);
    }
  }, [isOpen, messages.length]);

  // Close chat when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatModalRef.current &&
        !chatModalRef.current.contains(event.target as Node) &&
        window.innerWidth < 640 &&
        !(event.target as HTMLElement).closest('button[onclick*="setIsOpen"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] group">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={cn(
            "h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
            isOpen && "bg-primary"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:rotate-90" />
          ) : (
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </Button>
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Badge className="whitespace-nowrap animate-bounce">
              👋 Hello! Click to chat with me
            </Badge>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <Card
          ref={chatModalRef}
          className="fixed z-[100] flex flex-col overflow-hidden border shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
          style={{
            top: window.innerWidth >= 640 ? "0" : "50%",
            left: window.innerWidth >= 640 ? "auto" : "50%",
            transform:
              window.innerWidth >= 640 ? "none" : "translate(-50%, -50%)",
            bottom: window.innerWidth >= 640 ? "0" : "auto",
            right: window.innerWidth >= 640 ? "0" : "auto",
            width: window.innerWidth >= 640 ? "50vw" : "calc(100vw - 32px)",
            height: window.innerWidth >= 640 ? "100vh" : "calc(100vh - 120px)",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="relative shrink-0 border-b">
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

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                    aria-label={isExpanded ? "Minimize" : "Expand"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </Button>

                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4"
            >
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
                              <ol
                                className="list-decimal pl-4 mb-2"
                                {...props}
                              />
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
              className="shrink-0 p-4 border-t bg-background"
            >
              {uploadedFile && (
                <div className="mb-2 flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs flex-1 truncate">
                    {uploadedFile.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
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
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
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
              <p className="text-xs text-muted-foreground mt-2">
                📎 Upload your documents (PDF, TXT, DOCX) to chat about them
              </p>
            </form>
          </div>
        </Card>
      )}

      {/* Mobile overlay */}
      {isOpen && window.innerWidth < 640 && (
        <div
          className="fixed inset-0 bg-black/20 z-[90]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default ChatBot;
