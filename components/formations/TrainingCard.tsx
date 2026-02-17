import Link from "next/link";
import { Calendar, Clock, Users, MapPin, Award, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Training } from "@/lib/formations";

interface TrainingCardProps {
  training: Training;
}

export default function TrainingCard({ training }: TrainingCardProps) {
  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300">
      <div className="flex-1 p-6">
        {/* Header with accreditation badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
              {training.title}
            </h3>
            {training.accredited && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-accent/10 rounded-sm mb-3">
                <Award className="w-3 h-3 text-accent" />
                <span className="text-xs font-medium text-accent">Constructiv</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {training.description}
        </p>

        {/* Details */}
        <div className="space-y-2.5 mb-6">
          {training.date && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>{training.date}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span>{training.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span>{training.participants}</span>
          </div>
          {training.location && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>{training.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-6 pt-0">
        <Button
          asChild
          href="/contact"
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
        >
          Demander des informations
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}
