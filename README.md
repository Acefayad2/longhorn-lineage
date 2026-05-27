# Longhorn Lineage

Longhorn Lineage is a Next.js + Supabase MVP for Texas Longhorn owners, breeders, auctions, and ranch communities. It tracks ranch profiles, cattle profiles, ownership context, documents, marketplace listings, events, verification requests, and family-tree lineage.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Netlify deployment

## MVP Features

- Premium black-and-white responsive UI
- Landing page, auth page, dashboard, ranch profiles, cattle directory, cattle profile pages, add/edit form, family tree, marketplace, events, and admin verification dashboard
- Search/filter by longhorn name, ranch, registration number, sire, dam, breeder, and owner
- Sire, dam, offspring, and 3-generation pedigree display
- Placeholder Texas Longhorn data for local demo use
- Supabase server actions for auth and creating longhorn records
- Supabase SQL schema with RLS, storage buckets, indexes, and trigger scaffolding
- Netlify-ready config

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The app renders sample data without Supabase credentials. Auth and record creation require a configured Supabase project.

## Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Run the SQL in `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor or through the Supabase CLI.
5. Confirm Storage buckets exist:
   - `longhorn-photos`
   - `longhorn-documents`
6. In Supabase Auth settings, add your deployed Netlify URL and local URL to allowed redirect URLs.

`SUPABASE_SERVICE_ROLE_KEY` is intentionally not used in browser code. Only add server-side admin actions with it.

## Netlify Deployment

This repo includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

Exact Netlify build settings:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `20`

Set these Netlify environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` if admin server actions need privileged updates

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
```

## Project Structure

```text
src/app                 App Router pages
src/components          Shared UI and pedigree components
src/lib                 Sample data, types, Supabase clients, server actions
supabase/migrations     Database schema and policies
netlify.toml            Netlify build settings
```

## Manual Configuration Still Needed

- Create/connect the actual Supabase project.
- Apply the SQL migration.
- Add real storage upload flows for photo/document files beyond the MVP hook.
- Add admin-only authorization using app metadata before enabling privileged verification updates.
- Connect Netlify to the GitHub repository and add environment variables.
