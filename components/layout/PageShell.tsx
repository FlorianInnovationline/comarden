"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}
