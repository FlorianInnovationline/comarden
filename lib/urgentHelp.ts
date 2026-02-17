/**
 * Urgent Help Configuration
 * Quick Q&A and WhatsApp settings for the floating urgent info widget
 */

export interface QuickQA {
  id: string;
  question: string;
  answer: string;
}

// WhatsApp phone number (Belgium format without +)
// TODO: Replace with actual WhatsApp number
// Format: country code + number without spaces/symbols
// Example: "32461234567" for +32 461 23 45 67
export const WHATSAPP_PHONE = "3261412706"; // Using Bertrix phone as placeholder

export const QUICK_QA: QuickQA[] = [
  {
    id: "horaires",
    question: "Horaires d'ouverture ?",
    answer:
      "Lun–Ven: 7h30–12h00 / 13h00–17h00. Sam/Dim: fermé. En dehors de ces horaires, sur rendez-vous uniquement.",
  },
  {
    id: "adresse-bertrix",
    question: "Adresse Bertrix ?",
    answer:
      "Rue des Corettes, 47 — 6880 Bertrix. Tél: +32 (0)61 41 27 06. Fax: +32 (0)61 41 39 11.",
  },
  {
    id: "adresse-naninne",
    question: "Adresse Naninne ?",
    answer:
      "Rue des Pieds d'Alouette, 6 — 5100 Namur. Tél: +32 (0)81 40 11 33. Fax: +32 (0)81 40 06 43.",
  },
  {
    id: "livraison",
    question: "Livraison / camion-grue ?",
    answer:
      "Oui, nous proposons la livraison sur chantier avec camion-grue disponible. Manutention sécurisée incluse. Contactez-nous pour un devis de transport personnalisé selon vos besoins et la localisation de votre chantier.",
  },
  {
    id: "faconnage",
    question: "Façonnage sur mesure ?",
    answer:
      "Nous transformons vos matériaux aux dimensions exactes de votre chantier : pliage zinc et acier, découpe bois de précision, EPDM découpé à la mesure. Disponible pour tous nos produits.",
  },
  {
    id: "devis",
    question: "Demander un devis ?",
    answer:
      "Pour obtenir un devis personnalisé, vous pouvez nous contacter par téléphone, remplir le formulaire de contact sur notre site, ou nous envoyer un message via WhatsApp. Nous répondons généralement sous 24h en période ouverte.",
  },
];

/**
 * Build WhatsApp URL with prefilled message
 */
export function buildWhatsAppURL(
  message: string,
  selectedQuestions?: string[]
): string {
  const baseMessage = "[Comarden • Info urgente]\n\n";
  let fullMessage = baseMessage;

  if (selectedQuestions && selectedQuestions.length > 0) {
    fullMessage += `Questions sélectionnées:\n${selectedQuestions.join("\n")}\n\n`;
  }

  fullMessage += message;

  const encodedMessage = encodeURIComponent(fullMessage);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

/**
 * Get answer text by question ID
 */
export function getAnswerById(id: string): string | undefined {
  return QUICK_QA.find((qa) => qa.id === id)?.answer;
}
