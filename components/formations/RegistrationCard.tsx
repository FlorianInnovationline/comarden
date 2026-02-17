"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface RegistrationData {
  name: string;
  company: string;
  email: string;
  phone: string;
  tva?: string;
}

interface RegistrationCardProps {
  onSubmit: (data: RegistrationData) => void;
}

export default function RegistrationCard({ onSubmit }: RegistrationCardProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    tva: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, "").length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    if (!formData.company.trim()) {
      newErrors.company = "L'entreprise est requise";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Card className="p-8 lg:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-3">
          Inscription rapide
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Remplissez vos informations pour accéder au planificateur de journée de formation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Nom complet <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 ${
              errors.name ? "border-destructive focus:ring-destructive" : "border-border"
            }`}
            placeholder="Jean Dupont"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Entreprise <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 ${
              errors.company ? "border-destructive focus:ring-destructive" : "border-border"
            }`}
            placeholder="Nom de votre entreprise"
          />
          {errors.company && (
            <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.company}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 ${
              errors.email ? "border-destructive focus:ring-destructive" : "border-border"
            }`}
            placeholder="jean.dupont@entreprise.be"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone and TVA */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Téléphone <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 ${
                errors.phone ? "border-destructive focus:ring-destructive" : "border-border"
              }`}
              placeholder="+32 (0)XX XX XX XX"
            />
            {errors.phone && (
              <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="tva"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              TVA <span className="text-muted-foreground text-xs">(optionnel)</span>
            </label>
            <input
              type="text"
              id="tva"
              name="tva"
              value={formData.tva || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
              placeholder="BE-XXXXXXXXX"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Traitement...
            </>
          ) : (
            "Accéder au planning"
          )}
        </Button>
      </form>
    </Card>
  );
}
