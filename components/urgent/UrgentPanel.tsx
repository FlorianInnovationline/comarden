"use client";

import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send, AlertCircle, Zap, ChevronDown } from "lucide-react";
import ChatTranscript, { type ChatMessage } from "./ChatTranscript";
import { QUICK_QA, buildWhatsAppURL, type QuickQA } from "@/lib/urgentHelp";

interface UrgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UrgentPanel({ isOpen, onClose }: UrgentPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll on mobile when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  // Track scroll position to show/hide scroll indicator
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Show indicator if user hasn't scrolled much (less than 50% scrolled)
      // or if there's still content below
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      setShowScrollIndicator(scrollPercentage < 0.3);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, messages.length]);

  const handleQuestionClick = (qa: QuickQA) => {
    // Add question to selected if not already
    if (!selectedQuestions.includes(qa.question)) {
      setSelectedQuestions((prev) => [...prev, qa.question]);
    }

    // Simulate typing delay for more realistic chat feel
    setTyping(true);

    // Add question message immediately
    const questionMessage: ChatMessage = {
      id: `q-${Date.now()}-${qa.id}`,
      type: "question",
      content: qa.question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, questionMessage]);

    // Add answer message after a short delay (simulating typing)
    setTimeout(() => {
      setTyping(false);
      const answerMessage: ChatMessage = {
        id: `a-${Date.now()}-${qa.id}`,
        type: "answer",
        content: qa.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, answerMessage]);
    }, 800);
  };

  const handleSendWhatsApp = () => {
    if (!customMessage.trim() && selectedQuestions.length === 0) {
      textareaRef.current?.focus();
      return;
    }

    const whatsappURL = buildWhatsAppURL(customMessage, selectedQuestions);
    window.open(whatsappURL, "_blank");
    
    // Reset after sending
    setTimeout(() => {
      onClose();
      setMessages([]);
      setCustomMessage("");
      setSelectedQuestions([]);
    }, 300);
  };

  const handleReset = () => {
    setMessages([]);
    setCustomMessage("");
    setSelectedQuestions([]);
    setTyping(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
        style={{ animation: 'fade-in 0.3s ease-out' }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[56] w-full sm:w-[500px] sm:max-w-[calc(100vw-2rem)] h-[90vh] sm:h-[650px] max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-panel-entrance border border-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="urgent-panel-title"
        style={{ animation: 'panel-entrance 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Header with gradient */}
        <div className="relative flex items-start justify-between p-6 border-b border-slate-200 bg-gradient-to-br from-red-50 via-white to-white overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl" />
          </div>
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                <AlertCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2
                  id="urgent-panel-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Info urgente
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-slate-500 font-medium">En ligne</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 ml-[52px]">
              Choisissez une question ou envoyez un message.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 group"
            aria-label="Fermer le panneau"
          >
            <X className="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content area with proper flex layout - scrollable */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 min-h-0 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar relative"
        >
          <div className="flex flex-col p-6 gap-4 pb-4">
            {/* Quick Questions */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-red-500" strokeWidth={2} />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Questions fréquentes
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_QA.map((qa, index) => {
                  const isSelected = selectedQuestions.includes(qa.question);
                  return (
                    <button
                      key={qa.id}
                      onClick={() => handleQuestionClick(qa)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-1 ${
                        isSelected
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-lg shadow-red-500/30"
                          : "bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {qa.question}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Transcript - Fixed height and scrollable */}
            <div className="min-h-[280px] max-h-[350px] bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-4 shadow-inner flex flex-col overflow-hidden flex-shrink-0 relative">
              <ChatTranscript messages={messages} typing={typing} />
              
              {/* Very subtle WhatsApp indicator at bottom of chat area - appears when scrolling is needed */}
              {showScrollIndicator && (
                <div 
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-1000"
                  style={{ 
                    opacity: 0.25
                  }}
                >
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white/30 backdrop-blur-sm rounded-full border border-green-200/10">
                    <div className="relative">
                      <MessageCircle className="w-2 h-2 text-green-600/30" strokeWidth={2.5} fill="currentColor" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-0.5 h-0.5 bg-green-500/40 rounded-full"></div>
                    </div>
                    <span className="text-[7px] font-normal text-green-700/30 tracking-tight">WhatsApp</span>
                    <ChevronDown className="w-1.5 h-1.5 text-green-600/25" strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>

            {/* Scroll indicator - appears between chat and input when WhatsApp section is not visible */}
            {showScrollIndicator && (
              <div 
                className="flex-shrink-0 flex items-center justify-center py-2 animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                <button
                  onClick={() => {
                    const inputSection = document.getElementById('urgent-message');
                    inputSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="group flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <ChevronDown className="w-4 h-4 text-red-600 group-hover:translate-y-1 transition-transform duration-300 animate-bounce" strokeWidth={2.5} />
                  <span className="text-xs font-bold text-red-700">Faites défiler pour nous contacter</span>
                  <MessageCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Custom Message Input - Always visible */}
            <div className="flex-shrink-0 space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label
                  htmlFor="urgent-message"
                  className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                >
                  Écrivez votre question
                </label>
                <div className="relative">
                  <textarea
                    id="urgent-message"
                    ref={textareaRef}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Écrivez votre question..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none text-sm font-medium transition-all duration-200 hover:border-slate-300 shadow-sm hover:shadow-md"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendWhatsApp();
                      }
                    }}
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
                    {customMessage.length}/500
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendWhatsApp}
                disabled={!customMessage.trim() && selectedQuestions.length === 0}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-offset-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                Envoyer via WhatsApp
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-[10px] text-slate-400 text-center font-medium pt-2 border-t border-slate-100">
              Pour les demandes complexes, nous répondons via WhatsApp sous 24h.
            </p>
          </div>

          {/* Reset button (if messages exist) - Always at bottom */}
          {messages.length > 0 && (
            <div className="px-6 pb-4 pt-2 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium flex items-center gap-1.5 group"
              >
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
                Effacer la conversation
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
