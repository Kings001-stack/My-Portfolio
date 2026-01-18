# Supabase Setup

This guide configures the backend for the portfolio using Supabase with PostgreSQL, Auth, and Storage.

## 1) Create the Supabase Project
- Sign in at https://supabase.com and create a new project.
- Choose a strong database password.
- Note the Project URL and the API keys from Project Settings → API.

## 2) Environment Variables
Create `.env.local` at the repository root by copying from `.env.example` and filling values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- `SUPABASE_SERVICE_ROLE_KEY` is used only on the server and bypasses RLS. Do not expose it to the browser.
- `NEXT_PUBLIC_ADMIN_EMAILS` is a comma‑separated list allowed into `/admin`.

## 3) Run SQL Files
In the Supabase SQL editor, run each file separately:
- `sql/projects.sql`
- `sql/messages.sql`
- `sql/analytics.sql`

These create tables with proper primary keys, timestamps, and indexes. RLS is enabled on all tables.

### RLS Policies
- `projects`: public `SELECT` of rows where `status='published'`.
- `messages` and `analytics`: RLS enabled; server inserts/read using the service role key.

## 4) Enable Row Level Security
RLS is enabled by default in the SQL. You can confirm under Table editor → Security.

## 5) Auth Setup
- Go to Authentication → Providers.
- Enable Email (Magic Link).
- Optionally configure SMTP for production-grade email delivery.
- Under Authentication → Policies, leave defaults; the app gates `/admin` using middleware and checks `NEXT_PUBLIC_ADMIN_EMAILS`.

## 6) Storage Setup
- Go to Storage → Create bucket named `project-images`.
- Set the bucket to Public.
- Optional: Add a file size limit and image transformations as needed.
- The app uploads to `project-images` and saves the public URL to `projects.cover_image`.

## 7) Notes for Dashboard Configuration
- API → URL and Keys: copy the Project URL, anon key, service role key into `.env.local`.
- Authentication → Email templates: customize Magic Link branding.
- Storage → Bucket policies: keep public read; restrict write to authenticated users if desired. The app uses server routes and the service role to perform writes securely.

## 8) Verification
- Start the app: `npm run dev`
- Visit `/login`, sign in with an admin email (listed in `NEXT_PUBLIC_ADMIN_EMAILS`).
- Visit `/admin` to manage projects, messages, and view analytics.
- Confirm public site fetches published projects and dynamic pages render via `/projects/[slug]`.

