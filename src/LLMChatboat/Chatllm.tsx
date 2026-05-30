"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, Send, Bot, X, ExternalLink } from "lucide-react";
import ChatMessageContent from "@/components/chat/ChatMessageContent";
import { clientApiUrl } from "@/lib/clientApi";

type ChatLink = { title: string; url: string; type?: string };

type Message = {
  role: "user" | "assistant";
  content: string;
  time?: string;
  links?: ChatLink[];
};

const QUICK_PROMPTS = [
  "Best AI coding tools",
  "AI image generators",
  "AI SEO tools",
  "Free download tools",
];

export default function Chatllm() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chat_aiwedia");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_aiwedia", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi — I'm **AIWedia Assistant**. Ask about AI tools, SEO, coding, or free downloads and I'll share **clickable links** from our directory.",
          time: formatTime(),
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const sendMessage = useCallback(
    async (text?: string) => {
      const userText = (text ?? input).trim();
      if (!userText || loading) return;

      setInput("");
      setLoading(true);

      setMessages((prev) => [
        ...prev,
        { role: "user", content: userText, time: formatTime() },
      ]);

      try {
        const res = await fetch(clientApiUrl("/api/chatllm"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
          }
        );

        const data = await res.json();

        if (!res.ok && !data.reply) throw new Error("API failed");

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply || "No reply received. Try again.",
            links: Array.isArray(data.links) ? data.links : [],
            time: formatTime(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Connection issue — try again. Or browse [AI Tools](/category/ai-tools) and [Free Tools](/tools).",
            time: formatTime(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading]
  );

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed z-[998] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-105 active:scale-95 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6"
          aria-label="Open AI chat"
        >
          <MessageCircle size={26} />
          <span className="absolute -right-0.5 -top-0.5 rounded-full border-2 border-white bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold">
            AI
          </span>
        </button>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Close chat overlay"
            className="fixed inset-0 z-[1000] bg-black/30 sm:bg-transparent"
            onClick={handleClose}
          />

          <div
            role="dialog"
            aria-label="AIWedia chat"
            className="fixed z-[1001] flex flex-col overflow-hidden border border-slate-200/90 bg-white shadow-2xl left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[min(72vh,32rem)] rounded-2xl sm:left-auto sm:right-6 sm:bottom-6 sm:w-[min(400px,calc(100vw-2rem))] sm:h-[min(560px,calc(100dvh-5rem))] sm:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-white sm:rounded-t-2xl">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Bot size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold leading-tight">
                    AIWedia Assistant
                  </p>
                  <p className="text-[10px] text-white/70">
                    Tools with direct links
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="shrink-0 rounded-lg p-2 hover:bg-white/15"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-slate-50/80 p-3 sm:p-4">
              {messages.length <= 1 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                        m.role === "user"
                          ? "rounded-br-md bg-indigo-600 text-white"
                          : "rounded-bl-md border border-slate-200/80 bg-white text-slate-800"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <ChatMessageContent content={m.content} />
                      ) : (
                        <p className="whitespace-pre-wrap break-words">
                          {m.content}
                        </p>
                      )}

                      {m.role === "assistant" &&
                        m.links &&
                        m.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">
                            {m.links.map((link, j) => {
                              const internal =
                                link.url.includes("localhost") ||
                                link.url.includes("aiwedia.com");
                              if (internal) {
                                try {
                                  const path = new URL(link.url).pathname;
                                  return (
                                    <Link
                                      key={j}
                                      href={path}
                                      className="inline-flex max-w-full items-center gap-1 rounded-lg bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700 transition hover:bg-violet-100"
                                    >
                                      <ExternalLink size={11} className="shrink-0" />
                                      <span className="truncate">{link.title}</span>
                                    </Link>
                                  );
                                } catch {
                                  /* fall through */
                                }
                              }
                              return (
                                <a
                                  key={j}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex max-w-full items-center gap-1 rounded-lg bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700 transition hover:bg-violet-100"
                                >
                                  <ExternalLink size={11} className="shrink-0" />
                                  <span className="truncate">{link.title}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}

                      {m.time && (
                        <span
                          className={`mt-1 block text-[9px] ${
                            m.role === "user"
                              ? "text-white/60"
                              : "text-slate-400"
                          }`}
                        >
                          {m.time}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:300ms]" />
                    </span>
                    Finding tools & links…
                  </div>
                )}
              </div>
              <div ref={bottomRef} />
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:rounded-b-2xl">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  placeholder="Ask about AI tools…"
                  className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="shrink-0 rounded-lg bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-500 disabled:bg-slate-300"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[9px] text-slate-400">
                Powered by AIWedia · Links to your directory
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
