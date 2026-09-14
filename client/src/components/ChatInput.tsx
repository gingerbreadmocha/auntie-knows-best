import { useState } from "react";
import { useChat } from "../context/ChatContext";

export function ChatInput({ disabled }: { disabled: boolean }) {
  const [textInput, saveTextInput] = useState("");
  const { sendMessage, isLoading } = useChat();

  const handleSend = () => {
    const message = textInput.trim();
    if (!message) return;

    sendMessage(message);
    saveTextInput("");
  };

  return (
    <div className="w-full flex justify-center py-4 bg-white border border-violet-200 rounded-4xl">
      <input
        type="text"
        value={textInput}
        placeholder="Type a message..."
        className="w-full bg-transparent focus:outline-none text-violet-700 px-2 text-md ml-4"
        onChange={(e) => saveTextInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button
        type="button"
        disabled={isLoading || disabled}
        className="ml-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2 flex items-center justify-center transition-colors mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Send message"
        onClick={handleSend}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>
  );
}
