"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Bot, X, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  time?: string;
};

export default function Chatllm() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const saved = localStorage.getItem("chat_aiwedia");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("chat_aiwedia", JSON.stringify(messages));
  }, [messages]);

 
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hi 👋 I'm Aiwedia AI. How can I help you today?",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [open, messages.length]);

  
  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

 
 const handleClose = () => {
  setOpen(false);


  setMessages([]);

  
  localStorage.removeItem("chat_aiwedia");
};

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userText,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chatllm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        }
      );

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "⚠️ No reply received",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Connection error.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-15 right-6 z-[998] p-4 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-2xl"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 rounded-full border-2 border-white">
            AI
          </span>
        </motion.button>
      )}

      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-3 w-[95%] sm:w-[380px] h-[70vh] sm:h-[550px] z-[1001] flex flex-col bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl border overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <span className="text-sm font-semibold">
                  Aiwedia Support
                </span>
              </div>

              <button onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow transition-all hover:shadow-md ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    <p>{m.content}</p>
                    <span className="text-[9px] opacity-60 block mt-1">
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing */}
              {loading && (
                <div className="flex gap-1 items-center text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-300" />
                  AI is typing...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-t bg-white">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask something..."
                  className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
                />

                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300"
                >
                  <Send size={16} />
                </button>
              </div>

              <p className="text-[9px] text-center text-gray-400 mt-1">
                ⚡ Powered by Aiwedia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}