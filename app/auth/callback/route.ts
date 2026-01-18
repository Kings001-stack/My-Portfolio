import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // Handle errors from Supabase
  if (error) {
    console.error("Auth callback error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(errorDescription || "Authentication failed")}`,
        requestUrl.origin
      )
    );
  }

  // Check if code exists
  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Invalid authentication link", requestUrl.origin)
    );
  }

  try {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    // Create response object to attach cookies
    const response = NextResponse.redirect(
      new URL("/admin", requestUrl.origin)
    );

    // Create Supabase client with cookie handling that writes to response
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
            response.cookies.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    });

    // Exchange the code for a session
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent("Authentication link expired. Please request a new one.")}`,
          requestUrl.origin
        )
      );
    }

    if (!data.session) {
      return NextResponse.redirect(
        new URL("/login?error=Failed to establish session", requestUrl.origin)
      );
    }

    console.log("✅ Session established successfully for:", data.user?.email);

    // Return the response with cookies attached
    return response;
  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return NextResponse.redirect(
      new URL(
        "/login?error=An unexpected error occurred. Please try again.",
        requestUrl.origin
      )
    );
  }
}
