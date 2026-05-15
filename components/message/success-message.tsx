"use client";

import { CheckCircle2 } from "lucide-react";

interface SuccessMessageProps {
  show: boolean;
  message?: string;
}

export default function SuccessMessage({
  show,
  message = "Form submitted successfully!",
}: SuccessMessageProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="rounded-xl border border-green-200 bg-white/95 px-8 py-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <p className="text-lg font-semibold text-green-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}