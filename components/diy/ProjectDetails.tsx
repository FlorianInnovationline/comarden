"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { URGENCY_OPTIONS, LOCATION_OPTIONS } from "@/lib/diyOptions";

interface ProjectDetailsProps {
  areaM2: number;
  urgency: "Cette semaine" | "Ce mois-ci" | "Flexible";
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  notes: string;
  onAreaChange: (area: number) => void;
  onUrgencyChange: (urgency: "Cette semaine" | "Ce mois-ci" | "Flexible") => void;
  onLocationChange: (location: string) => void;
  onClientNameChange: (v: string) => void;
  onClientEmailChange: (v: string) => void;
  onClientPhoneChange: (v: string) => void;
  onClientAddressChange: (v: string) => void;
  onNotesChange: (notes: string) => void;
}

export default function ProjectDetails({
  areaM2,
  urgency,
  location,
  clientName,
  clientEmail,
  clientPhone,
  clientAddress,
  notes,
  onAreaChange,
  onUrgencyChange,
  onLocationChange,
  onClientNameChange,
  onClientEmailChange,
  onClientPhoneChange,
  onClientAddressChange,
  onNotesChange,
}: ProjectDetailsProps) {
  const [localArea, setLocalArea] = useState(areaM2.toString());

  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalArea(value);
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0 && numValue <= 300) {
      onAreaChange(numValue);
    }
  };

  return (
    <div className="space-y-8">
      {/* Surface slider */}
      <div>
        <label className="block text-base font-bold text-slate-700 mb-4">
          Surface estimée
          <span className="ml-3 text-2xl font-bold text-primary">
            {areaM2} m²
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="300"
            step="5"
            value={areaM2}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setLocalArea(value.toString());
              onAreaChange(value);
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
            aria-label="Surface en mètres carrés"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0 m²</span>
            <span>300 m²</span>
          </div>
        </div>
        <input
          type="number"
          min="0"
          max="300"
          value={localArea}
          onChange={handleAreaInputChange}
          className="mt-3 w-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Ou saisir directement"
          aria-label="Surface en mètres carrés (saisie directe)"
        />
      </div>

      {/* Urgency pills */}
      <div>
        <label className="block text-base font-bold text-slate-700 mb-4">
          Urgence
        </label>
        <div className="flex flex-wrap gap-3">
          {URGENCY_OPTIONS.map((option) => {
            const isSelected = urgency === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onUrgencyChange(option)}
                aria-pressed={isSelected}
                className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                  isSelected
                    ? "bg-accent text-white shadow-lg scale-105 ring-2 ring-accent/20"
                    : "bg-white border-2 border-slate-200 text-slate-700 hover:border-accent/50 hover:shadow-md hover:scale-[1.02]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-base font-bold text-slate-700 mb-3">
          Lieu du projet
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all text-base font-medium"
          aria-required="true"
        >
          <option value="">Sélectionnez une province</option>
          {LOCATION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Client info */}
      <div>
        <label className="block text-base font-bold text-slate-700 mb-4">
          Vos coordonnées
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-semibold text-slate-600 mb-1.5">Nom complet *</label>
            <input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              placeholder="Jean Dupont"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all text-base"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-semibold text-slate-600 mb-1.5">E-mail *</label>
            <input
              id="clientEmail"
              type="email"
              value={clientEmail}
              onChange={(e) => onClientEmailChange(e.target.value)}
              placeholder="jean@example.com"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all text-base"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="clientPhone" className="block text-sm font-semibold text-slate-600 mb-1.5">Téléphone *</label>
            <input
              id="clientPhone"
              type="tel"
              value={clientPhone}
              onChange={(e) => onClientPhoneChange(e.target.value)}
              placeholder="0476 12 34 56"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all text-base"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="clientAddress" className="block text-sm font-semibold text-slate-600 mb-1.5">Adresse</label>
            <input
              id="clientAddress"
              type="text"
              value={clientAddress}
              onChange={(e) => onClientAddressChange(e.target.value)}
              placeholder="Rue de la Toiture 12, 5000 Namur"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all text-base"
            />
          </div>
        </div>
      </div>

      {/* Upload placeholder */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Photos du projet (optionnel)
        </label>
        <div className="relative">
          <button
            type="button"
            disabled
            className="w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50 flex flex-col items-center justify-center gap-2 text-slate-400 cursor-not-allowed"
            aria-label="Ajouter des photos (fonctionnalité à venir)"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm font-medium">Ajouter photos (bientôt)</span>
            <span className="text-xs">Cette fonctionnalité sera disponible prochainement</span>
          </button>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-base font-bold text-slate-700 mb-3">
          Notes supplémentaires (optionnel)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={5}
          className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-accent transition-all resize-none text-base"
          placeholder="Décrivez votre projet, vos questions, ou toute information utile..."
          aria-label="Notes supplémentaires"
        />
      </div>
    </div>
  );
}
