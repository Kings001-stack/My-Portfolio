"use client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browserClient";
import Link from "next/link";

export default function AuthDebugPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = getBrowserSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="glass p-8 rounded-2xl">
          <p>Loading session info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="glass p-8 rounded-2xl max-w-2xl w-full">
        <h1 className="text-3xl font-extrabold mb-6 glow-icon text-center">
          Auth Debug Info
        </h1>

        {session ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-900/20 border border-green-500 rounded">
              <p className="text-green-400 font-bold">✅ Session Active</p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {session.user?.id}
              </p>
              <p>
                <strong>Expires At:</strong>{" "}
                {new Date(session.expires_at! * 1000).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Link href="/admin" className="glow-btn">
                Go to Admin
              </Link>
              <Link href="/" className="glow-btn">
                Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-500 rounded">
              <p className="text-red-400 font-bold">❌ No Active Session</p>
            </div>

            <p className="text-gray-300">
              You are not currently logged in. Please use the magic link from
              your email or request a new one.
            </p>

            <div className="mt-6 flex gap-4">
              <Link href="/login" className="glow-btn">
                Go to Login
              </Link>
              <Link href="/" className="glow-btn">
                Go to Home
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-900/50 rounded text-sm">
          <p className="font-bold mb-2">Cookies Present:</p>
          <pre className="text-xs overflow-auto">
            {document.cookie || "No cookies found"}
          </pre>
        </div>
      </div>
    </div>
  );
}
