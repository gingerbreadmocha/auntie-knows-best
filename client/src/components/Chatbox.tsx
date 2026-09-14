import { useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { useChat, type ChatMessage } from "../context/ChatContext";
import { useGetHeartbeat } from "../hooks/useGetHeartbeat";

const Topbar = () => {
  const { clearChat, history } = useChat();

  return (
    <div className="w-full border-violet-200 flex flex-row items-center gap-4">
      <img
        className="w-20 h-20 rounded-full shrink-0"
        src="auntie.png"
        alt="Rounded avatar"
      />
      <div className="flex flex-col border-b border-violet-200 flex-1">
        <h2 className="text-3xl text-violet-900">Chinese auntie</h2>

        <p className="text-lg text-violet-900">Here to keep you on track!</p>
      </div>
      <button
        type="button"
        onClick={clearChat}
        disabled={history.length === 0}
        aria-label="Refresh chat"
        title="Refresh chat"
        className="shrink-0 px-3 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-md flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
        <span>Refresh</span>
      </button>
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
  const { ready } = useGetHeartbeat();
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
        {ready ? (
          history.length === 0 && !isLoading ? (
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
          )
        ) : (
          <p className="text-violet-700/70 text-center my-auto">
            Auntie is coming from the kitchen... please wait a sec.
          </p>
        )}
      </div>
      <ChatInput disabled={!ready} />
    </div>
  );
}
