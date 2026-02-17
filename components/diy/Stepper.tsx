"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function Stepper({ currentStep, totalSteps, stepLabels }: StepperProps) {
  return (
    <div className="w-full mb-4 lg:mb-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-accent transition-all duration-500 ease-out -z-10"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              {/* Step circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white scale-110 shadow-md"
                    : isCompleted
                    ? "bg-accent/80 text-white"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              
              {/* Step label */}
              <span
                className={`mt-1.5 text-[10px] sm:text-xs font-medium text-center max-w-[80px] ${
                  isActive
                    ? "text-primary font-semibold"
                    : isCompleted
                    ? "text-slate-600"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
