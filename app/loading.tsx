"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-primary mb-3" />
        <span className="text-sm text-gray-300">Loading...</span>
      </div>
    </div>
  );
}
