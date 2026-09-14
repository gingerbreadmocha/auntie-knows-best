import { useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { useChat, type ChatMessage } from "../context/ChatContext";

const Topbar = () => {
  return (
    <div className="w-full border-violet-200 flex flex-row">
      <img
        className="w-20 h-20 rounded-full mr-8"
        src="auntie.png"
        alt="Rounded avatar"
      />
      <div className="flex flex-col border-b border-violet-200 w-full">
        <h2 className="text-3xl text-violet-900">Chinese auntie</h2>

        <p className="text-lg text-violet-900">Here to keep you on track!</p>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  const text = message.parts.map((part) => part.text).join("\n");

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <img
          className="w-10 h-10 rounded-full mr-3 shrink-0"
          src="auntie.png"
          alt="Chinese auntie"
        />
      )}
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-md whitespace-pre-wrap ${
          isUser
            ? "bg-violet-600 text-white rounded-br-md"
            : "bg-white border border-violet-200 text-violet-900 rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="w-full flex justify-start">
      <img
        className="w-10 h-10 rounded-full mr-3 shrink-0"
        src="auntie.png"
        alt="Chinese auntie"
      />
      <div className="max-w-[70%] px-4 py-2 rounded-2xl rounded-bl-md text-md bg-white border border-violet-200 text-violet-900 whitespace-nowrap">
        Auntie is typing
        <span className="typing-dots" aria-hidden="true">
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </span>
      </div>
    </div>
  );
};

export function Chatbox() {
  const { history, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the chatbox after every msg
  useEffect(() => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history, isLoading]);

  return (
    <div className="w-full max-w-4xl h-[80vh] border border-violet-200 rounded-xl shadow-lg p-6 flex flex-col justify-between items-center bg-orange-50">
      <Topbar />
      <div
        ref={messagesEndRef}
        className="w-full flex-1 overflow-y-auto flex flex-col gap-4 my-4 pr-2"
      >
        {history.length === 0 && !isLoading ? (
          <p className="text-violet-700/70 text-center my-auto">
            Say hi to Auntie to get started
          </p>
        ) : (
          <>
            {history.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
      </div>
      <ChatInput />
    </div>
  );
}
