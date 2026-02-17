"use client";

import { useState, useEffect } from "react";
import Stepper from "./Stepper";
import ProjectTypeGrid from "./ProjectTypeGrid";
import NeedsSelector from "./NeedsSelector";
import ProjectDetails from "./ProjectDetails";
import ProToggleCard from "./ProToggleCard";
import SummaryPanel from "./SummaryPanel";
import SuccessState from "./SuccessState";
import type { DiyRequest } from "@/lib/diyOptions";

const STEPS = [
  "Type de projet",
  "Besoins",
  "Détails",
  "Professionnel",
];

export default function DiyWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState<Partial<DiyRequest>>({
    projectTypes: [],
    needs: [],
    details: {
      areaM2: 50,
      urgency: "Flexible",
      location: "",
      notes: "",
    },
    pro: {
      requested: false,
    },
  });

  // Listen for scroll-to-pro event
  useEffect(() => {
    const handleScrollToPro = (e: Event) => {
      setCurrentStep(4);
      setData((prev) => ({
        ...prev,
        pro: { ...prev.pro, requested: true },
      }));
    };

    window.addEventListener("scroll-to-pro", handleScrollToPro);
    return () => {
      window.removeEventListener("scroll-to-pro", handleScrollToPro);
    };
  }, []);

  const handleProjectTypeToggle = (typeId: string) => {
    setData((prev) => {
      const currentTypes = prev.projectTypes || [];
      const newTypes = currentTypes.includes(typeId)
        ? currentTypes.filter((id) => id !== typeId)
        : [...currentTypes, typeId];
      return { ...prev, projectTypes: newTypes };
    });
  };

  const handleNeedToggle = (needId: string) => {
    setData((prev) => {
      const currentNeeds = prev.needs || [];
      const newNeeds = currentNeeds.includes(needId)
        ? currentNeeds.filter((id) => id !== needId)
        : [...currentNeeds, needId];
      return { ...prev, needs: newNeeds };
    });
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!data.projectTypes || data.projectTypes.length === 0) {
        setErrors(["Veuillez sélectionner au moins un type de projet"]);
        return;
      }
    } else if (currentStep === 2) {
      if (!data.needs || data.needs.length === 0) {
        setErrors(["Veuillez sélectionner au moins un besoin"]);
        return;
      }
    } else if (currentStep === 3) {
      if (!data.details?.location || data.details.location.trim() === "") {
        setErrors(["Veuillez sélectionner un lieu"]);
        return;
      }
    }

    setErrors([]);
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const handleSubmit = () => {
    // Validate all required fields
    const newErrors: string[] = [];
    if (!data.projectTypes || data.projectTypes.length === 0) {
      newErrors.push("Au moins un type de projet est requis");
    }
    if (!data.needs || data.needs.length === 0) {
      newErrors.push("Au moins un besoin est requis");
    }
    if (!data.details?.location || data.details.location.trim() === "") {
      newErrors.push("Le lieu est requis");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      // Shake animation on error
      const summaryPanel = document.querySelector('[data-summary-panel]');
      if (summaryPanel) {
        summaryPanel.classList.add('animate-shake');
        setTimeout(() => {
          summaryPanel.classList.remove('animate-shake');
        }, 500);
      }
      return;
    }

    // Build final payload
    const payload: DiyRequest = {
      projectTypes: data.projectTypes || [],
      needs: data.needs || [],
      details: {
        areaM2: data.details?.areaM2 || 0,
        urgency: data.details?.urgency || "Flexible",
        location: data.details?.location || "",
        notes: data.details?.notes || "",
      },
      pro: {
        requested: data.pro?.requested || false,
        interventionType: data.pro?.interventionType,
        desiredDate: data.pro?.desiredDate,
        budgetRange: data.pro?.budgetRange,
      },
      meta: {
        createdAt: new Date().toISOString(),
        source: "do-it-yourself",
      },
    };

    // Console.log payload
    console.log("DIY Request Payload:", JSON.stringify(payload, null, 2));

    // Show success state
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessState />;
  }

  return (
    <section id="diy-builder" className="py-6 lg:py-8 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stepper */}
        <div className="mb-4 lg:mb-6">
          <Stepper currentStep={currentStep} totalSteps={STEPS.length} stepLabels={STEPS} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main wizard content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border-2 border-slate-200/80 shadow-lg p-5 lg:p-6">
              {/* Step 1: Project Types */}
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-primary mb-1.5">
                      Quel type de projet ?
                    </h2>
                    <p className="text-sm text-slate-600">
                      Sélectionnez un ou plusieurs types de projets qui correspondent à vos besoins.
                    </p>
                  </div>
                  <ProjectTypeGrid
                    selectedTypes={data.projectTypes || []}
                    onToggle={handleProjectTypeToggle}
                  />
                </div>
              )}

              {/* Step 2: Needs */}
              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-primary mb-1.5">
                      De quoi avez-vous besoin ?
                    </h2>
                    <p className="text-sm text-slate-600">
                      Choisissez les services ou produits dont vous avez besoin pour votre projet.
                    </p>
                  </div>
                  <NeedsSelector
                    selectedProjectTypes={data.projectTypes || []}
                    selectedNeeds={data.needs || []}
                    onToggle={handleNeedToggle}
                  />
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-primary mb-1.5">
                      Détails de votre projet
                    </h2>
                    <p className="text-sm text-slate-600">
                      Aidez-nous à mieux comprendre votre projet.
                    </p>
                  </div>
                  <ProjectDetails
                    areaM2={data.details?.areaM2 || 50}
                    urgency={data.details?.urgency || "Flexible"}
                    location={data.details?.location || ""}
                    notes={data.details?.notes || ""}
                    onAreaChange={(area) =>
                      setData((prev) => ({
                        ...prev,
                        details: { ...prev.details!, areaM2: area },
                      }))
                    }
                    onUrgencyChange={(urgency) =>
                      setData((prev) => ({
                        ...prev,
                        details: { ...prev.details!, urgency },
                      }))
                    }
                    onLocationChange={(location) =>
                      setData((prev) => ({
                        ...prev,
                        details: { ...prev.details!, location },
                      }))
                    }
                    onNotesChange={(notes) =>
                      setData((prev) => ({
                        ...prev,
                        details: { ...prev.details!, notes },
                      }))
                    }
                  />
                </div>
              )}

              {/* Step 4: Pro */}
              {currentStep === 4 && (
                <div className="animate-fadeIn">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-primary mb-1.5">
                      Professionnel Comarden
                    </h2>
                    <p className="text-sm text-slate-600">
                      Souhaitez-vous qu&apos;un professionnel Comarden intervienne sur votre projet ?
                    </p>
                  </div>
                  <ProToggleCard
                    requested={data.pro?.requested || false}
                    interventionType={data.pro?.interventionType}
                    desiredDate={data.pro?.desiredDate}
                    budgetRange={data.pro?.budgetRange}
                    onToggle={(requested) =>
                      setData((prev) => ({
                        ...prev,
                        pro: { ...prev.pro!, requested },
                      }))
                    }
                    onInterventionTypeChange={(type) =>
                      setData((prev) => ({
                        ...prev,
                        pro: { ...prev.pro!, interventionType: type },
                      }))
                    }
                    onDesiredDateChange={(date) =>
                      setData((prev) => ({
                        ...prev,
                        pro: { ...prev.pro!, desiredDate: date },
                      }))
                    }
                    onBudgetRangeChange={(range) =>
                      setData((prev) => ({
                        ...prev,
                        pro: { ...prev.pro!, budgetRange: range },
                      }))
                    }
                  />
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                    currentStep === 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-white border-2 border-slate-300 text-slate-700 hover:border-primary hover:text-primary hover:shadow-md hover:scale-105"
                  }`}
                >
                  ← Précédent
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20"
                  >
                    Suivant →
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div data-summary-panel>
              <SummaryPanel data={data} onSubmit={handleSubmit} errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
