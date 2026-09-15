import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

export type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

type ChatContextValue = {
  history: ChatMessage[];
  isLoading: boolean;
  sendMessage: (userText: string) => Promise<void>;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  // Load initial history from localStorage if it exists
  const [history, setHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("auntie_chat_history");
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as ChatMessage[]) : [];
    } catch {
      // Corrupt or unparseable stored history; start fresh
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync to localStorage on updates
  useEffect(() => {
    localStorage.setItem("auntie_chat_history", JSON.stringify(history));
  }, [history]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: userText }],
    };
    const updatedHistory = [...history, userMessage];

    setHistory(updatedHistory);
    setIsLoading(true);

    try {
      // Send only the last 20 msgs to save bandwidth
      const recentHistory = history.slice(-20);

      const currentTime = new Date().toISOString();

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: recentHistory,
          currentTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: { reply: string } = await response.json();
      const modelMessage: ChatMessage = {
        role: "model",
        parts: [{ text: data.reply }],
      };

      setHistory((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error("Failed to communicate with Auntie server:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
    localStorage.removeItem("auntie_chat_history");
  };

  return (
    <ChatContext.Provider
      value={{ history, isLoading, sendMessage, clearChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Hook for context access
export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
