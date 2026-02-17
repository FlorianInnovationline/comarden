"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

interface FormData {
  civilite: string;
  nom: string;
  prenom: string;
  localite: string;
  email: string;
  telephone: string;
  societe: string;
  tva: string;
  message: string;
  conditions: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    civilite: "",
    nom: "",
    prenom: "",
    localite: "",
    email: "",
    telephone: "",
    societe: "",
    tva: "",
    message: "",
    conditions: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic phone validation (allows spaces, dashes, parentheses)
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.civilite) {
      newErrors.civilite = "La civilité est requise";
    }
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.localite.trim()) {
      newErrors.localite = "La localité est requise";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!validatePhone(formData.telephone)) {
      newErrors.telephone = "Veuillez entrer un numéro de téléphone valide";
    }
    if (!formData.societe.trim()) {
      newErrors.societe = "La société est requise";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }
    if (!formData.conditions) {
      newErrors.conditions = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setFormData({
        civilite: "",
        nom: "",
        prenom: "",
        localite: "",
        email: "",
        telephone: "",
        societe: "",
        tva: "",
        message: "",
        conditions: false,
      });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-50" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Card className="p-8 lg:p-10 hover:shadow-xl transition-all duration-300 group overflow-hidden relative border-2 border-transparent hover:border-accent/20">
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Send className="w-6 h-6 text-accent group-hover:animate-pulse transition-all duration-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight group-hover:text-accent transition-colors duration-300">
                    Envoyez-nous un message
                  </h2>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed pl-14">
                  Remplissez le formulaire ci-dessous et nous vous recontacterons
                  dans les 24h.
                </p>
              </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Civilité */}
              <div>
                <label
                  htmlFor="civilite"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Civilité <span className="text-destructive">*</span>
                </label>
                <select
                  id="civilite"
                  name="civilite"
                  value={formData.civilite}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                    errors.civilite ? "border-destructive focus:ring-destructive" : "border-border"
                  }`}
                >
                  <option value="">Sélectionner</option>
                  <option value="Monsieur">Monsieur</option>
                  <option value="Madame">Madame</option>
                  <option value="Mademoiselle">Mademoiselle</option>
                </select>
                {errors.civilite && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.civilite}
                  </p>
                )}
              </div>

              {/* Nom et Prénom */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nom <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                      errors.nom ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                  />
                  {errors.nom && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.nom}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Prénom <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                      errors.prenom ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                  />
                  {errors.prenom && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.prenom}
                    </p>
                  )}
                </div>
              </div>

              {/* Localité */}
              <div>
                <label
                  htmlFor="localite"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Localité <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="localite"
                  name="localite"
                  value={formData.localite}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                    errors.localite ? "border-destructive focus:ring-destructive" : "border-border"
                  }`}
                />
                {errors.localite && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.localite}
                  </p>
                )}
              </div>

              {/* Email et Téléphone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                      errors.email ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Téléphone <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                      errors.telephone ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                  />
                  {errors.telephone && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.telephone}
                    </p>
                  )}
                </div>
              </div>

              {/* Société et TVA */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="societe"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Société <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="societe"
                    name="societe"
                    value={formData.societe}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 ${
                      errors.societe ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                  />
                  {errors.societe && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.societe}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="tva"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    TVA <span className="text-muted-foreground text-xs">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    id="tva"
                    name="tva"
                    value={formData.tva}
                    onChange={handleChange}
                    placeholder="BE-XXXXXXXXX"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-accent/50 resize-none ${
                    errors.message ? "border-destructive focus:ring-destructive" : "border-border"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="conditions"
                    checked={formData.conditions}
                    onChange={handleChange}
                    className={`mt-1 w-4 h-4 rounded border border-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all ${
                      errors.conditions ? "border-destructive" : ""
                    }`}
                  />
                  <span className="text-sm text-foreground leading-relaxed">
                    J'accepte les{" "}
                    <a
                      href="/conditions-dutilisation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent underline font-medium"
                    >
                      conditions d'utilisation
                    </a>{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                {errors.conditions && (
                  <p className="mt-1.5 ml-7 text-sm text-destructive flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.conditions}
                  </p>
                )}
              </div>

              {/* Success Message */}
              {status === "success" && (
                <div className="p-5 bg-gradient-to-r from-green-50 to-green-50/50 border-2 border-green-200 rounded-lg flex items-start gap-3 shadow-lg animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800 mb-1">
                      Message envoyé avec succès !
                    </p>
                    <p className="text-sm text-green-700 leading-relaxed">
                      Nous vous recontacterons dans les 24h.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === "error" && Object.keys(errors).length > 0 && (
                <div className="p-5 bg-gradient-to-r from-red-50 to-red-50/50 border-2 border-red-200 rounded-lg flex items-start gap-3 shadow-lg animate-[fadeIn_0.3s_ease-out]">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800 mb-1">
                      Veuillez corriger les erreurs ci-dessus
                    </p>
                    <p className="text-sm text-red-700 leading-relaxed">
                      Tous les champs marqués d'un astérisque (*) sont
                      obligatoires.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group/btn relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </Button>
            </form>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
