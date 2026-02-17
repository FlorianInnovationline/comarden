"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

export default function RequestBox() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTraining, setSelectedTraining] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setEmail("");
      setName("");
      setMessage("");
      setSelectedTraining("");

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Card className="p-8 lg:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
                Intéressé par une formation ?
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                Contactez-nous pour obtenir plus d&apos;informations sur nos formations
                ou pour organiser une session sur mesure pour votre équipe.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nom et prénom
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3 border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
                    status === "error" && !validateEmail(email)
                      ? "border-destructive"
                      : "border-border"
                  }`}
                  placeholder="votre@email.com"
                />
                {status === "error" && !validateEmail(email) && email && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Veuillez entrer une adresse email valide
                  </p>
                )}
              </div>

              {/* Training Selection */}
              <div>
                <label htmlFor="training" className="block text-sm font-medium text-foreground mb-2">
                  Formation concernée (optionnel)
                </label>
                <select
                  id="training"
                  value={selectedTraining}
                  onChange={(e) => setSelectedTraining(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  <option value="">Sélectionner une formation</option>
                  <option value="terreal">Formation TERREAL</option>
                  <option value="zinc">Formation couverture zinc</option>
                  <option value="isolation">Isolation thermique et acoustique</option>
                  <option value="charpente">Charpente bois moderne</option>
                  <option value="epdm">Étanchéité EPDM</option>
                  <option value="autre">Autre / Session sur mesure</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  placeholder="Votre message ou questions..."
                />
              </div>

              {/* Success Message */}
              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    Votre demande a été envoyée avec succès ! Nous vous contacterons rapidement.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !email}
                className="w-full rounded-sm bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer la demande
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
