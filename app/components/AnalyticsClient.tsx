"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsClient() {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, action: "view" }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [pathname]);
  return null;
}

