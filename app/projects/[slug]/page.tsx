import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/serverClient";
import type { Project } from "@/lib/supabase/types";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("projects")
    .select("title, description, cover_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (!data) return { title: "Project" };
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.cover_image ? [data.cover_image] : [],
    },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (!data) notFound();
  const p = data as Project;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 glow-icon">
          {p.title}
        </h1>
        <Image
          src={p.cover_image || "/port.png"}
          alt={p.title}
          width={1024}
          height={512}
          className="w-full h-auto rounded-xl mb-6 img-effect"
        />
        <p className="text-gray-300 mb-6">{p.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.isArray(p.tech_stack) &&
            p.tech_stack.map((t, i) => (
              <span key={i} className="glow-btn">
                {String(t)}
              </span>
            ))}
        </div>
        <div className="flex gap-3">
          {p.live_url && (
            <a
              href={p.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn"
            >
              Live
            </a>
          )}
          {p.github_url && (
            <a
              href={p.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
