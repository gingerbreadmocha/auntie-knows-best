import { useState } from "react";

export function ChatInput() {
  const [textInput, saveTextInput] = useState("");
  return (
    <div className="w-full flex justify-center py-4 bg-white border border-violet-200 rounded-4xl">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full bg-transparent focus:outline-none text-violet-700 px-2 text-md ml-4"
        onChange={(e) => saveTextInput(e.target.value)}
      />
      <button
        type="button"
        className="ml-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2 flex items-center justify-center transition-colors mr-4"
        aria-label="Send message"
        onClick={() => {
          console.log("current msg ", textInput);
        }}
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
