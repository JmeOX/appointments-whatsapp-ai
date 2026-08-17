# Appointments WhatsApp AI

A WhatsApp-native appointment management system built to solve a real problem: most scheduling tools (Calendly, Cal.com, Acuity) are email-first and disconnected from how businesses in LATAM actually communicate with their clients — through WhatsApp.

This project combines a clean web dashboard with automated WhatsApp reminders and natural-language appointment management powered by an LLM.

## The Idea

Business owners manage appointments manually today: a mental note, a spreadsheet, or a chat thread that gets buried. This app gives them:

- A simple dashboard to create, confirm, and cancel appointments.
- Automatic WhatsApp reminders sent to clients 24 hours before their appointment.
- Automatic delivery of the meeting link 15 minutes before a virtual appointment starts.
- A natural-language interface where the owner can type something like _"move Ana's appointment to Friday at 3pm"_ and have an LLM parse the intent and update the record — no forms required for quick edits.

The differentiator isn't the CRUD (any framework can do that) — it's the WhatsApp-native automation layer and the LLM-powered natural language control, aimed at a market that lives on WhatsApp rather than email.

## Tech Stack

| Layer      | Technology                                          | Why                                                                          |
| ---------- | --------------------------------------------------- | ---------------------------------------------------------------------------- |
| Frontend   | Next.js 16 (App Router) + TypeScript + Tailwind CSS | Modern React framework with Server Components for fast, secure data fetching |
| Database   | PostgreSQL via Supabase                             | Managed Postgres with built-in Row Level Security and instant APIs           |
| Messaging  | Twilio WhatsApp API                                 | Fastest path to WhatsApp automation for development and prototyping          |
| AI / LLM   | Gemini API                                          | Natural language parsing for appointment commands                            |
| Testing    | Vitest                                              | Unit testing for Server Actions, with mocked Supabase and Next.js internals  |
| Deployment | Vercel                                              | Zero-config deploys for Next.js                                              |

## Features

### Done

- [x] Next.js 16 project scaffolded with TypeScript, Tailwind, and the App Router
- [x] Supabase connected as the database, with Row Level Security enabled on the `appointments` table
- [x] Full CRUD flow for appointments (create, view, confirm, cancel) via Server Actions
- [x] Server Actions organized separately from UI (`actions/appointments.ts`)
- [x] Custom design system: Fraunces + IBM Plex typography, ledger-style appointment list with status indicators
- [x] `loading.tsx` skeleton state and custom `not-found.tsx` for the appointment detail route
- [x] Root path redirects to `/appointments`
- [x] Unit tests for Server Actions using Vitest with mocked Supabase client and Next.js navigation/cache functions

### Planned

- [ ] Twilio WhatsApp sandbox integration
- [ ] Automated reminder 24 hours before an appointment
- [ ] Automated meeting link delivery 15 minutes before a virtual appointment
- [ ] Natural language appointment editing via Gemini (e.g. "cancel Juan's 3pm appointment")
- [ ] User authentication, with RLS policies scoped to the authenticated owner
- [ ] Deployment to Vercel
- [ ] Two-way WhatsApp management (incoming messages triggering appointment changes) — stretch goal, phase 2

## Project Structure

```
appointments-whatsapp-ai/
├── app/
│   ├── appointments/
│   │   ├── page.tsx           # Appointment list
│   │   ├── loading.tsx        # Skeleton loading state
│   │   ├── new/
│   │   │   └── page.tsx       # Create appointment form
│   │   └── [id]/
│   │       ├── page.tsx       # Appointment detail + confirm/cancel
│   │       └── not-found.tsx  # Custom 404 for missing appointments
│   ├── api/
│   │   └── webhooks/
│   │       └── twilio/
│   │           └── route.ts   # Incoming WhatsApp webhook (planned)
│   └── page.tsx                # Redirects to /appointments
├── actions/
│   └── appointments.ts        # Server Actions: create, updateStatus
├── lib/
│   ├── supabase.ts            # Supabase client
│   └── types.ts                # Shared TypeScript types
├── actions/appointments.test.ts # Unit tests for Server Actions
└── vitest.config.mts
```

## Database Schema

```sql
create table appointments (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_phone text not null,
  scheduled_at timestamptz not null,
  type text check (type in ('in_person', 'virtual')) not null,
  meeting_link text,
  status text check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  notes text,
  created_at timestamptz default now()
);

alter table appointments enable row level security;
```

> Row Level Security is currently permissive (`using (true)`) as the project has no authentication yet. This is documented technical debt, to be replaced with owner-scoped policies once user auth is added.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Run the dev server
npm run dev

# Run tests
npm run test
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Why This Project

Built as a portfolio project to demonstrate practical, production-oriented skills relevant to AI-integrated frontend engineering: Server Components and Server Actions, real database integration with security policies (not just mocked data), automated third-party API integration (WhatsApp), and thoughtful LLM integration inside a real product workflow rather than as a novelty chatbot layered on top.
