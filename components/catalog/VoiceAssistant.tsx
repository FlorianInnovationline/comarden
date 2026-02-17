"use client";

import { useState, useRef, useEffect } from 'react';
import { Mic, X, Send } from 'lucide-react';
import type { CatalogData, CatalogProduct, VoiceResponse } from '@/types/catalog';
import { parseVoiceCommand } from '@/lib/catalog/voice-parser';

interface VoiceAssistantProps {
  catalogData: CatalogData;
  onNavigate: (page: number) => void;
  onFilter: (filters: any) => void;
  onSearch: (query: string) => void;
  onOpenProduct: (product: CatalogProduct) => void;
  token: string;
}

export default function VoiceAssistant({
  catalogData,
  onNavigate,
  onFilter,
  onSearch,
  onOpenProduct,
  token,
}: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      handleCommand(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setReply('Erreur de reconnaissance vocale. Veuillez réessayer.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      setReply('Reconnaissance vocale non disponible dans ce navigateur.');
      return;
    }

    setIsListening(true);
    setTranscript('');
    setReply('');
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleCommand = async (text: string) => {
    const response = parseVoiceCommand(text, catalogData);
    setReply(response.reply);
    setSuggestions(response.suggestions || []);

    // Execute command
    const { command } = response;
    
    switch (command.type) {
      case 'SEARCH':
        if (command.payload.keywords) {
          onSearch(command.payload.keywords);
        }
        break;

      case 'FILTER':
        onFilter({
          category: command.payload.category,
          brand: command.payload.brand,
          color: command.payload.color,
          minPrice: command.payload.minPrice,
          maxPrice: command.payload.maxPrice,
          promoOnly: command.payload.promoOnly,
        });
        break;

      case 'NAVIGATE':
        if (command.payload.pageNumber !== undefined) {
          if (command.payload.pageNumber === -1) {
            // Next page - handled by parent
            onNavigate(-1); // Special value
          } else if (command.payload.pageNumber === -2) {
            // Previous page
            onNavigate(-2); // Special value
          } else {
            onNavigate(command.payload.pageNumber - 1); // Convert to 0-based
          }
        }
        break;

      case 'OPEN_PRODUCT':
        if (command.payload.productSku) {
          const product = catalogData.products.find(p => p.sku === command.payload.productSku);
          if (product) {
            onOpenProduct(product);
          }
        } else if (command.payload.resultIndex !== undefined) {
          // Open product by index in filtered results
          // This would need to be implemented with filtered products state
        }
        break;

      default:
        break;
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      handleCommand(transcript);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-primary rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Ouvrir l'assistant vocal"
      >
        <Mic className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-border animate-scale-in">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-primary">Assistant vocal</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-lg hover:bg-neutral/50 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {/* Transcript */}
        {transcript && (
          <div className="text-sm text-muted-foreground">
            <strong>Vous:</strong> {transcript}
          </div>
        )}

        {/* Reply */}
        {reply && (
          <div className="text-sm text-primary bg-neutral/50 p-3 rounded-lg">
            <strong>Assistant:</strong> {reply}
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleCommand(suggestion)}
                className="px-3 py-1 text-xs bg-neutral/50 hover:bg-neutral rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Text Input Fallback */}
        <form onSubmit={handleTextSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Tapez votre commande..."
            className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            aria-label="Envoyer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Mic Button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-accent text-primary hover:bg-accent/90'
          }`}
        >
          <Mic className="w-5 h-5" />
          {isListening ? 'Arrêter...' : 'Parler'}
        </button>
      </div>
    </div>
  );
}
