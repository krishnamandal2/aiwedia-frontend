"use client";

import dynamic from "next/dynamic";

const Chatllm = dynamic(() => import("@/LLMChatboat/Chatllm"), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetLoader() {
  return <Chatllm />;
}
