import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

interface CalloutProps {
  variant?: "info" | "success" | "warning" | "default";
  title?: string;
  children: React.ReactNode;
}

const variants = {
  info: {
    icon: Info,
    bg: "bg-primary/5",
    border: "border-primary/20",
    iconColor: "text-primary",
    titleColor: "text-primary",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    border: "border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-accent/10",
    border: "border-accent/30",
    iconColor: "text-accent",
    titleColor: "text-accent-dark",
  },
  default: {
    icon: AlertCircle,
    bg: "bg-neutral/50",
    border: "border-border",
    iconColor: "text-muted-foreground",
    titleColor: "text-foreground",
  },
};

export default function Callout({
  variant = "info",
  title,
  children,
}: CalloutProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <Reveal>
      <Card
        className={`${config.bg} ${config.border} border-l-4 p-6 my-8`}
        variant="minimal"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5`} />
          </div>
          <div className="flex-1">
            {title && (
              <h3 className={`font-semibold ${config.titleColor} mb-2`}>
                {title}
              </h3>
            )}
            <div className="text-sm text-muted-foreground leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
