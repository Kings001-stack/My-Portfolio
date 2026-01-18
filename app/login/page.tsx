"use client";
import { useState, useEffect } from "react";
import { getBrowserSupabase } from "@/lib/supabase/browserClient";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(decodeURIComponent(error));
      setStatus("error");
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const supabase = getBrowserSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password");
        setStatus("error");
        return;
      }

      if (data.session) {
        // Successfully logged in - redirect to admin
        router.push("/admin");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="glass p-8 rounded-2xl max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 glow-icon text-center">
          Admin Login
        </h1>
        <p className="text-center text-gray-300 mb-4">
          Enter your admin credentials to access the dashboard.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            className="glow-btn flex justify-center items-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {status === "error" && (
          <div className="mt-4 text-center text-red-400">
            {errorMessage ||
              "Failed to sign in. Please check your credentials."}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link href="/" className="glow-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
