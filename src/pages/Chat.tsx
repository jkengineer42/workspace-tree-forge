import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return (
    <div className="flex flex-col h-full">
      <h1 className="font-serif text-2xl text-foreground mb-1">Chat</h1>
      <p className="text-muted-foreground text-sm mb-6">Ask anything about sustainable materials</p>

      <div className="flex-1 rounded-xl border border-border bg-card/60 p-6 mb-4 overflow-auto">
        {initialQuery ? (
          <div className="flex flex-col gap-4">
            <div className="self-end max-w-[70%] rounded-2xl rounded-br-md bg-primary text-primary-foreground px-4 py-3 text-sm">
              {initialQuery}
            </div>
            <div className="self-start max-w-[70%] rounded-2xl rounded-bl-md bg-accent text-accent-foreground px-4 py-3 text-sm">
              <span className="inline-block w-2 h-2 bg-forest rounded-full animate-pulse mr-1" />
              <span className="inline-block w-2 h-2 bg-forest rounded-full animate-pulse mr-1" style={{ animationDelay: "0.2s" }} />
              <span className="inline-block w-2 h-2 bg-forest rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Start a conversation…
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card/80 px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          defaultValue=""
          placeholder="Type your message…"
          className="flex-1 bg-transparent text-foreground text-sm outline-none"
        />
        <button className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
          <svg className="h-3.5 w-3.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
