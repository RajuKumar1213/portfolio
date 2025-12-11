"use client";
import ReactMarkdown from "react-markdown";

import os from "os";
import crypto from "crypto";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function generateSessionId() {
  const info = {
    cpuModel: os.cpus()[0]?.model || "",
    cpuCount: os.cpus().length,
    totalMem: os.totalmem(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    hostname: os.hostname(),
    homeDir: os.homedir(),
  };

  const raw = JSON.stringify(info);

  return crypto.createHash("sha256").update(raw).digest("hex");
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatMessage = (text: string) => {
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const sessionId = generateSessionId();
    fetch(`http://localhost:8000/api/chat/history/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const sessionId = generateSessionId();

    try {
      const response = await fetch("http://localhost:8000/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, sessionId }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || data.data || "No response",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.log("api error", error);

      const errorMessage: Message = {
        role: "assistant",
        content: "Failed to get response. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 ${
          isOpen && "bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600"
        } text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group`}
      >
        {isOpen ? (
          <svg
            className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <Image
            src="/images/bot.png"
            alt="bot"
            height={200}
            width={200}
            className="cursor-pointer"
          />
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[480px] h-[700px] bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200/50 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 overflow-hidden min-w-[400px] min-h-[500px] max-w-[800px] max-h-[90vh]"
          style={{ resize: "both", direction: "rtl" }}
        >
          <div style={{ direction: "ltr" }} className="flex flex-col h-full">
            {/* Header */}
            <div className="relative shrink-0">
              <div className="text-black px-5 py-3 flex items-center justify-between shadow-lg bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 ">
                    <Image
                      src="/images/bot.png"
                      alt="bot"
                      height={160}
                      width={160}
                      className="cursor-pointer"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-md">AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className="text-xs text-gray-700">Online</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      Start a conversation
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Ask me anything!
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in slide-in-from-bottom-2 duration-300`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 shrink-0 mt-1">
                      <Image
                        src="/images/ai2.png"
                        alt="AI"
                        height={24}
                        width={24}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-md px-3 py-2.5 ${
                      message.role === "user"
                        ? "bg-linear-to-br from-blue-100 to-indigo-100 text-black "
                        : "text-gray-800"
                    }`}
                  >
                    <span className="text-sm leading-relaxed font-semibold inline-block whitespace-normal">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="rounded-2xl px-4 py-3">
                    <div className="flex space-x-1.5">
                      <div
                        className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 shrink-0"
            >
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1.5 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`mr-2 w-6 h-6 transition-opacity ${
                    isLoading || !input.trim()
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Image
                      src="/images/send2.png"
                      alt="send"
                      height={100}
                      width={100}
                      className="pointer-events-none"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
