"use client";

import { useState, useEffect, useRef } from "react";
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

 useEffect(() => {
  setChatHistory([
    {
      sender: "bot",
      text: "Hello 👋 I'm your AI assistant. Ask me about AI tools.",
    },
  ]);
}, []);
  const sendMessage = async (overrideMsg?: string) => {
    const textToSend = overrideMsg || msg;
    if (!textToSend.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: textToSend }]);
    setMsg("");
    setTyping(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: data.reply },
        ]);
        setTyping(false);
      }, 600);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
      setTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, typing]);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(msg.toLowerCase())
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000]">
      {/* Floating Toggle Button */}
      {!open && (
        <motion.button
          layoutId="chat-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="p-4 rounded-full shadow-2xl text-white bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center"
        >
          <Sparkles size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="chat-card"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            // Mobile: Drag down to close
          drag="y"
dragConstraints={{ top: 0, bottom: 0 }}
dragElastic={0.3}
onDragEnd={(_, info) => {
  if (info.offset.y > 120) setOpen(false);
}}
           
            className="
  fixed bottom-20 right-4
  w-[92vw] max-w-[380px] h-[70vh]
  rounded-2xl
  
  sm:bottom-0 sm:right-0
  sm:h-[600px] sm:w-[400px]

  flex flex-col overflow-hidden border bg-white shadow-2xl z-[1001]
"
          >
            {/* Header: Draggable Handle for Mobile */}
            <div className="flex flex-col bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shrink-0">
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden" />
              
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight">Aiwedia</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-[10px] uppercase tracking-wider opacity-80 font-medium">Online</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronDown className="hidden sm:block" size={24} />
                  <X className="sm:hidden" size={24} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-slate-50/50">
              {chatHistory.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-xs font-medium px-4 py-2 rounded-full border border-indigo-100 bg-white text-indigo-600 shadow-sm active:bg-indigo-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {chatHistory.map((c, i) => (
                <div key={i} className={`flex items-end gap-2 ${c.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {c.sender === "bot" && (
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md">
                      <Sparkles size={16} />
                    </div>
                  )}
                  <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm max-w-[80%] ${
                    c.sender === "user"
                      ? "bg-indigo-600 text-white rounded-2xl rounded-br-none"
                      : "bg-white text-slate-700 rounded-2xl rounded-bl-none border border-slate-100"
                  }`}>
                    {c.text}
                  </div>
                  {c.sender === "user" && (
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-slate-200 text-slate-600 shadow-sm">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-4 py-3 rounded-2xl w-fit shadow-sm">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t shrink-0 pb-safe">
              <div className="relative flex items-center gap-2">
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  /* text-base prevents iOS auto-zoom */
                  className="flex-1 bg-slate-100 rounded-2xl px-5 py-3 text-base sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!msg.trim()}
                  className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 active:scale-90 disabled:opacity-50 transition-all"
                >
                  <Send size={20} />
                </button>

                {/* Autocomplete Suggestions */}
                {msg && filteredSuggestions.length > 0 && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border rounded-xl shadow-xl overflow-hidden z-10">
                    {filteredSuggestions.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => { setMsg(s); sendMessage(s); }}
                        className="px-4 py-3 text-sm hover:bg-indigo-50 cursor-pointer border-b last:border-none active:bg-indigo-100"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}