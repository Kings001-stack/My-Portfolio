"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Loading() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-6" role="status" aria-live="polite" aria-busy="true">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Loading…</span>
          <span className="text-xs text-gray-500">Please wait</span>
        </div>
        <div className="loader-track" aria-hidden="true">
          <div className="loader-bar">
            <div className="loader-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
