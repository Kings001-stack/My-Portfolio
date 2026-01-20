"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getBrowserSupabase } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";
import type { Project, Message, Profile } from "@/lib/supabase/types";

type Tab = "projects" | "messages" | "analytics" | "profile";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<
    { page: string; action: string; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const [form, setForm] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description: "",
    tech_stack: [],
    github_url: "",
    live_url: "",
    cover_image: "",
    status: "draft",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  const [profileForm, setProfileForm] = useState<Partial<Profile>>({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects/all");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchProfile = async () => {
    setLoading(true);
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data) {
      setProfileForm({
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || "",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (tab === "messages") {
        await fetchMessages();
      } else if (tab === "analytics") {
        setLoading(true);
        const res = await fetch("/api/analytics/list");
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      } else if (tab === "profile") {
        await fetchProfile();
      }
    };
    run();
  }, [tab]);

  const uploadImage = async () => {
    if (!imageFile) return null;
    try {
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
      const { data, error: storageError } = await supabase.storage
        .from("project-images")
        .upload(fileName, imageFile, { upsert: false });

      if (storageError) {
        console.error("Storage upload error:", storageError);
        throw new Error(`Storage upload failed: ${storageError.message}. Ensure a public bucket named 'project-images' exists.`);
      }

      const { data: publicUrl } = supabase.storage
        .from("project-images")
        .getPublicUrl(data.path);

      if (!publicUrl?.publicUrl) {
        throw new Error("Failed to get public URL for uploaded image.");
      }

      console.log("Uploaded image URL:", publicUrl.publicUrl);
      return publicUrl.publicUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
      return "UPLOAD_FAILED";
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return null;
    try {
      const fileName = `avatar-${Date.now()}-${avatarFile.name.replace(/\s+/g, '_')}`;
      const { data, error: storageError } = await supabase.storage
        .from("project-images")
        .upload(fileName, avatarFile, { upsert: false });

      if (storageError) {
        throw new Error(`Avatar upload failed: ${storageError.message}`);
      }

      const { data: publicUrl } = supabase.storage
        .from("project-images")
        .getPublicUrl(data.path);

      return publicUrl.publicUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Avatar upload failed");
      return "UPLOAD_FAILED";
    }
  };

  const createProject = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Attempt upload if new file selected
    const url = await uploadImage();

    if (url === "UPLOAD_FAILED") {
      setLoading(false);
      return; // Stop execution
    }

    const payload = { ...form, cover_image: url || form.cover_image };
    console.log("Saving project payload:", payload);

    if (editingProject) {
      // Update existing project
      const res = await fetch(`/api/projects/${editingProject}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setEditingProject(null);
        setForm({
          title: "",
          slug: "",
          description: "",
          tech_stack: [],
          github_url: "",
          live_url: "",
          cover_image: "",
          status: "draft",
        });
        setImageFile(null);
        setTechInput("");
        setSuccess("Project updated successfully!");
        await fetchProjects();
      } else {
        const err = await res.json();
        setError(`Update error: ${err.error || "Unknown server error"}`);
        console.error("Update error:", err);
      }
    } else {
      // Create new project
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setForm({
          title: "",
          slug: "",
          description: "",
          tech_stack: [],
          github_url: "",
          live_url: "",
          cover_image: "",
          status: "draft",
        });
        setImageFile(null);
        setTechInput("");
        setSuccess("Project created successfully!");
        await fetchProjects();
      } else {
        const err = await res.json();
        setError(`Create error: ${err.error || "Unknown server error"}`);
        console.error("Create error:", err);
      }
    }
    setLoading(false);
  };

  const editProject = (project: Project) => {
    setEditingProject(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
      github_url: project.github_url,
      live_url: project.live_url,
      cover_image: project.cover_image,
      status: project.status,
    });
    setTechInput("");
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setForm({
      title: "",
      slug: "",
      description: "",
      tech_stack: [],
      github_url: "",
      live_url: "",
      cover_image: "",
      status: "draft",
    });
    setImageFile(null);
    setTechInput("");
  };

  const saveProfile = async () => {
    setLoading(true);
    const url = await uploadAvatar();
    const payload = {
      name: profileForm.name,
      title: profileForm.title,
      bio: profileForm.bio,
      avatar_url: url || profileForm.avatar_url,
    };
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setAvatarFile(null);
      await fetchProfile();
    }
    setLoading(false);
  };

  const updateProjectStatus = async (
    id: string,
    status: "draft" | "published"
  ) => {
    setLoading(true);
    await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchProjects();
    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await fetchProjects();
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="glass p-4 sm:p-6 rounded-2xl max-w-6xl w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold glow-icon">Admin Dashboard</h1>
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <button
              className={`glow-btn px-3 py-1.5 text-sm sm:text-base ${tab === "projects" ? "border-primary" : ""}`}
              onClick={() => setTab("projects")}
            >
              Projects
            </button>
            <button
              className={`glow-btn px-3 py-1.5 text-sm sm:text-base ${tab === "messages" ? "border-primary" : ""}`}
              onClick={() => setTab("messages")}
            >
              Messages
            </button>
            <button
              className={`glow-btn px-3 py-1.5 text-sm sm:text-base ${tab === "analytics" ? "border-primary" : ""}`}
              onClick={() => setTab("analytics")}
            >
              Analytics
            </button>
            <button
              className={`glow-btn px-3 py-1.5 text-sm sm:text-base ${tab === "profile" ? "border-primary" : ""}`}
              onClick={() => setTab("profile")}
            >
              Profile
            </button>
            <button
              className="glow-btn bg-red-900/20 border-red-500 hover:bg-red-900/40 px-3 py-1.5"
              onClick={handleLogout}
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-500 rounded-xl text-red-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <i className="bi bi-exclamation-triangle-fill text-xl"></i>
            <div className="flex-1">
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button className="hover:text-white p-1" onClick={() => setError(null)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/40 border border-green-500 rounded-xl text-green-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <i className="bi bi-check-circle-fill text-xl"></i>
            <div className="flex-1">
              <p className="font-bold">Success</p>
              <p className="text-sm">{success}</p>
            </div>
            <button className="hover:text-white p-1" onClick={() => setSuccess(null)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}

        {tab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass p-4 rounded-xl">
              <h2 className="text-xl font-bold mb-4">
                {editingProject ? "Edit Project" : "Create Project"}
              </h2>
              <div className="flex flex-col gap-3">
                <input
                  className="p-2 rounded bg-black border border-gray-700"
                  placeholder="Title"
                  value={form.title as string}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="p-2 rounded bg-black border border-gray-700"
                  placeholder="Slug (unique)"
                  value={form.slug as string}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <textarea
                  className="p-2 rounded bg-black border border-gray-700"
                  placeholder="Description"
                  value={form.description as string}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Tech Stack
                  </label>
                  <div className="p-2 rounded bg-black border border-gray-700 min-h-[42px] flex flex-wrap gap-2 items-center">
                    {Array.isArray(form.tech_stack) && (form.tech_stack as string[]).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-md text-sm text-primary flex items-center gap-2 group hover:bg-primary/20 transition-all"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => {
                            const newStack = (form.tech_stack as string[]).filter((_, i) => i !== index);
                            setForm({ ...form, tech_stack: newStack });
                          }}
                          className="text-primary/50 group-hover:text-primary"
                        >
                          <i className="bi bi-x-lg text-[10px]"></i>
                        </button>
                      </span>
                    ))}
                    <input
                      className="bg-transparent border-none outline-none flex-1 min-w-[120px] text-sm"
                      placeholder={Array.isArray(form.tech_stack) && form.tech_stack.length > 0 ? "Add more..." : "Type and press Enter (e.g. React)"}
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          const val = techInput.trim().replace(/,$/, "");
                          if (val && !((form.tech_stack as string[]).includes(val))) {
                            setForm({
                              ...form,
                              tech_stack: [...(form.tech_stack as string[] || []), val],
                            });
                          }
                          setTechInput("");
                        } else if (e.key === "Backspace" && !techInput && Array.isArray(form.tech_stack) && form.tech_stack.length > 0) {
                          const newStack = [...(form.tech_stack as string[])];
                          newStack.pop();
                          setForm({ ...form, tech_stack: newStack });
                        }
                      }}
                    />
                  </div>
                </div>
                <input
                  className="p-2 rounded bg-black border border-gray-700"
                  placeholder="GitHub URL"
                  value={form.github_url as string}
                  onChange={(e) =>
                    setForm({ ...form, github_url: e.target.value })
                  }
                />
                <input
                  className="p-2 rounded bg-black border border-gray-700"
                  placeholder="Live URL"
                  value={form.live_url as string}
                  onChange={(e) =>
                    setForm({ ...form, live_url: e.target.value })
                  }
                />
                <select
                  className="p-2 rounded bg-black border border-gray-700"
                  value={form.status as "draft" | "published"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Project Cover Image
                  </label>
                  <div className="flex flex-col gap-4">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => document.getElementById('project-image-input')?.click()}
                    >
                      <div className="w-full h-48 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 overflow-hidden">
                        {(imageFile || form.cover_image) ? (
                          <Image
                            src={imageFile ? URL.createObjectURL(imageFile) : (form.cover_image || "")}
                            alt="Preview"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <>
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-400">Click to upload cover image</span>
                          </>
                        )}
                        {(imageFile || form.cover_image) && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold">Change Image</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="project-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </div>
                    {imageFile && (
                      <button
                        onClick={() => setImageFile(null)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <i className="bi bi-trash"></i> Remove selected image
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="glow-btn flex-1"
                    onClick={createProject}
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editingProject
                        ? "Update Project"
                        : "Save Project"}
                  </button>
                  {editingProject && (
                    <button
                      className="glow-btn bg-gray-900/20 border-gray-500"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="glass p-4 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Projects</h2>
              {loading && <div className="text-gray-300 mb-3">Loading...</div>}
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-800 rounded-lg p-3 gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-bold truncate">{p.title}</div>
                      <div className="text-xs text-gray-400 truncate">{p.slug}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                      <button
                        className="glow-btn text-sm px-3 py-1"
                        onClick={() => editProject(p)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <select
                        className="p-2 rounded bg-black border border-gray-700 text-sm"
                        value={p.status}
                        onChange={(e) =>
                          updateProjectStatus(
                            p.id,
                            e.target.value as "draft" | "published"
                          )
                        }
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                      <button
                        className="glow-btn bg-red-900/20 border-red-500 text-sm px-3 py-1"
                        onClick={() => deleteProject(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="glass p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
            {loading && <div className="text-gray-300 mb-3">Loading...</div>}
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="border border-gray-800 rounded-lg p-3"
                >
                  <div className="font-bold">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.email}</div>
                  <div className="mt-2 text-gray-200">{m.message}</div>
                </div>
              ))}
              {!messages.length && (
                <div className="text-gray-300">No messages yet.</div>
              )}
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="glass p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Basic Analytics</h2>
            {loading && <div className="text-gray-300 mb-3">Loading...</div>}
            {!loading && (
              <div className="flex flex-col gap-3">
                {Object.entries(
                  events.reduce<Record<string, number>>((acc, e) => {
                    acc[e.page] = (acc[e.page] || 0) + 1;
                    return acc;
                  }, {})
                )
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([page, count]) => (
                    <div
                      key={page}
                      className="flex items-center justify-between border border-gray-800 rounded-lg p-3"
                    >
                      <span className="text-gray-200">{page}</span>
                      <span className="glow-btn">{count}</span>
                    </div>
                  ))}
                {!events.length && (
                  <div className="text-gray-300">No analytics yet.</div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "profile" && (
          <div className="glass p-4 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <div className="flex flex-col gap-3">
              <input
                className="p-2 rounded bg-black border border-gray-700"
                placeholder="Name"
                value={(profileForm.name as string) || ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
              />
              <input
                className="p-2 rounded bg-black border border-gray-700"
                placeholder="Title"
                value={(profileForm.title as string) || ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, title: e.target.value })
                }
              />
              <textarea
                className="p-2 rounded bg-black border border-gray-700"
                placeholder="Bio"
                value={(profileForm.bio as string) || ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">
                  Profile Avatar
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div
                    className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-700 hover:border-primary/50 transition-all"
                    onClick={() => document.getElementById('avatar-input')?.click()}
                  >
                    {(avatarFile || profileForm.avatar_url) ? (
                      <Image
                        src={avatarFile ? URL.createObjectURL(avatarFile) : (profileForm.avatar_url || "")}
                        alt="Avatar"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <i className="bi bi-person-plus text-2xl"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <i className="bi bi-camera text-white"></i>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      className="glow-btn text-xs py-1 px-3"
                      onClick={() => document.getElementById('avatar-input')?.click()}
                    >
                      Choose New Avatar
                    </button>
                    {avatarFile && (
                      <span className="text-xs text-gray-400 truncate max-w-[150px]">
                        {avatarFile.name}
                      </span>
                    )}
                  </div>
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>
              <button
                className="glow-btn mt-4"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
