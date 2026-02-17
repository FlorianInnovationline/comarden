"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, User, CheckCheck } from "lucide-react";

export interface ChatMessage {
  id: string;
  type: "question" | "answer";
  content: string;
  timestamp: Date;
}

interface ChatTranscriptProps {
  messages: ChatMessage[];
  typing?: boolean;
}

export default function ChatTranscript({ messages, typing = false }: ChatTranscriptProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, [messages.length, typing]);

  if (messages.length === 0 && !typing) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center h-full min-h-[200px]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-4 animate-fade-in">
          <MessageCircle className="w-8 h-8 text-red-600" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-slate-600 font-medium animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Sélectionnez une question ci-dessus pour voir la réponse
        </p>
        <p className="text-xs text-slate-400 mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Ou écrivez votre question en bas
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-2 custom-scrollbar"
      >
        <div className="flex flex-col gap-4 pt-1">
          {messages.map((message, index) => {
            const isQuestion = message.type === "question";
            // Show avatar on first message or when message type changes
            const isFirstOfGroup = index === 0 || messages[index - 1].type !== message.type;
            
            return (
              <div
                key={message.id}
                className={`flex gap-3 items-end animate-slide-in-bubble ${
                  isQuestion ? "justify-end flex-row-reverse" : "justify-start"
                }`}
              >
                {/* Avatar - only show on first message of group */}
                {isFirstOfGroup && (
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isQuestion
                        ? "bg-gradient-to-br from-primary to-primary/80 shadow-sm"
                        : "bg-gradient-to-br from-red-50 to-red-100 shadow-sm"
                    }`}
                  >
                    {isQuestion ? (
                      <User className="w-4 h-4 text-white" strokeWidth={2} />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
                    )}
                  </div>
                )}
                
                {/* Spacer when no avatar */}
                {!isFirstOfGroup && <div className="w-8 flex-shrink-0" />}

                {/* Message bubble */}
                <div
                  className={`group relative max-w-[80%] sm:max-w-[75%] ${
                    isQuestion
                      ? "bg-gradient-to-br from-primary to-primary/90 text-white rounded-2xl rounded-tr-sm shadow-md hover:shadow-lg transition-shadow"
                      : "bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-slate-300"
                  }`}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
                      {message.content}
                    </p>
                    <div className={`flex items-center gap-1.5 mt-2 ${isQuestion ? 'justify-end' : 'justify-start'}`}>
                      <span
                        className={`text-[10px] ${
                          isQuestion ? "text-white/70" : "text-slate-400"
                        } font-medium`}
                      >
                        {message.timestamp.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isQuestion && (
                        <CheckCheck className="w-3 h-3 text-white/60" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                  
                  {/* Tail indicator */}
                  <div
                    className={`absolute ${
                      isQuestion
                        ? "right-0 bottom-0 translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-primary rounded-sm"
                        : "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-b border-slate-200 rounded-sm"
                    }`}
                  />
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-end gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>
    </div>
  );
}
