"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, User, ChevronDown } from "lucide-react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const suggestions = [
  "Best AI tools",
  "AI image generator",
  "AI coding tools",
  "AI video tools",
  "Free AI tools",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Initial bot message
  useEffect(() => {
    setChatHistory([
      {
        sender: "bot",
        text: "Hello 👋 I'm your AI assistant. Ask me about AI tools.",
      },
    ]);
  }, []);

  // Optimized suggestions
  const filteredSuggestions = useMemo(() => {
    if (!msg) return [];
    return suggestions.filter((s) =>
      s.toLowerCase().includes(msg.toLowerCase())
    );
  }, [msg]);

  const sendMessage = async (overrideMsg?: string) => {
    const textToSend = overrideMsg || msg;
    if (!textToSend.trim()) return;

    // Cancel previous request
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: textToSend },
    ]);

    setMsg("");
    setTyping(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
          signal: controllerRef.current.signal,
        }
      );

      const data = await res.json();

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Something went wrong. Please try again.",
          },
        ]);
      }
    } finally {
      setTyping(false);
    }
  };

  // Smooth scroll (optimized)
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory.length, typing]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000]">
      
      {/* Toggle Button */}
      {!open && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="p-4 rounded-full shadow-xl text-white bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500"
        >
          <Sparkles size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="
              fixed bottom-20 right-4
              w-[92vw] max-w-[380px] h-[70vh]
              sm:bottom-0 sm:right-0 sm:h-[600px] sm:w-[400px]
              rounded-2xl flex flex-col overflow-hidden border bg-white shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <span className="font-semibold text-sm">Aiwedia</span>
              </div>

              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              
              {chatHistory.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-2 rounded-full border bg-white text-indigo-600"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {chatHistory.map((c, i) => (
                <div
                  key={i}
                  className={`flex ${
                    c.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 text-sm max-w-[80%] rounded-2xl ${
                      c.sender === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    {c.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="text-xs text-gray-500">Typing...</div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-100 outline-none"
                  placeholder="Type..."
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!msg.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>

              {/* Suggestions */}
              {msg && filteredSuggestions.length > 0 && (
                <div className="mt-2 bg-white border rounded-lg shadow">
                  {filteredSuggestions.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}