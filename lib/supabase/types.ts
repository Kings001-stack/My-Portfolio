export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: Record<string, unknown> | string[] | null;
  github_url: string | null;
  live_url: string | null;
  cover_image: string | null;
  status: "draft" | "published";
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
};

export type AnalyticsEvent = {
  id: string;
  page: string;
  action: string;
  created_at: string;
};

export type Profile = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};
