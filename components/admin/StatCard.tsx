"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: string;
  iconName: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, iconName, color, trend }: StatCardProps) {
  const Icon = (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Package;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-border/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "0ms" }}
    >
      {/* Animated gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-6">
          {/* Icon with animated background */}
          <div className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
            />
            <div
              className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
            >
              <Icon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" />
            </div>
          </div>

          {/* Trend indicator */}
          {trend && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                trend.isPositive
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Value with counter animation effect */}
        <div className="mb-2">
          <div className="text-3xl sm:text-4xl font-bold text-primary group-hover:text-primary/90 transition-colors duration-300">
            {value}
          </div>
        </div>

        {/* Title */}
        <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {title}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </div>
  );
}
