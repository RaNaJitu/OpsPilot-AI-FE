# OpsPilot AI — Frontend

**AI-powered incident response for modern engineering teams.**

OpsPilot AI helps SRE and DevOps teams turn production logs into actionable insights — AI root-cause analysis, conversational investigation, automated recovery runbooks, and dashboard analytics in one workflow.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-lightgrey)](#)


**Live demo:** [opspilot.shrabjeet.com](https://opspilot.shrabjeet.com/)
  
**Repository:** [github.com/RaNaJitu/OpsPilot-AI-FE](https://github.com/RaNaJitu/OpsPilot-AI-FE)

---

## Overview

| Capability | Description |
|---|---|
| **AI Analysis** | Upload production logs and get root cause, evidence, and recommendations |
| **Incident Assistant** | Context-aware chat scoped to a completed analysis |
| **Runbooks** | Generate recovery steps and export PDF reports |
| **Dashboard** | Track severity, trends, services, and recent incidents |
| **Auth** | Google OAuth with secure cookie sessions and automatic token refresh |

```
Upload Log → AI Analysis → Root Cause → Runbook → AI Assistant
```

---

## Tech Stack

| Layer | Tools |
|---|---|
| UI | React 19, Vite 8, Tailwind CSS |
| Routing | React Router 7 |
| Data | TanStack Query, Axios |
| Auth | Google OAuth (`@react-oauth/google`), httpOnly cookies |
| Charts | Recharts |
| PDF | jsPDF + jspdf-autotable |
| Icons / Feedback | Lucide React, Sonner |
| Deploy | Vercel (SPA rewrites via `vercel.json`) |

---

## Features

### Product
- Landing, About, and Pricing marketing pages
- Google sign-in → dashboard
- Incident upload (`.log`, `.txt`, `.json`)
- AI analysis, runbook generation, PDF export
- Incident list, detail, history, and assistant
- Light / dark theme

### Engineering UX
- Loading skeletons on major pages
- Empty states with clear CTAs
- Error states (offline, AI failed, upload failed, 403 / 404 / 500)
- Toast notifications for key actions
- Axios interceptor: `401` → refresh → retry; refresh fail → landing

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Running OpsPilot AI **backend** (default: `http://localhost:8000`)
- Google OAuth Client ID (Web application)

### Install

```bash
git clone https://github.com/RaNaJitu/OpsPilot-AI-FE.git
cd OpsPilot-AI-FE
bun install
```

### Environment

Create a `.env` file in the project root:

```env
MODE=development

# Backend API (include /api/v1)
VITE_API_URL=http://localhost:8000/api/v1

# Google OAuth Web Client ID
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Optional display defaults (actual model is configured on the server)
# VITE_AI_MODEL=gpt-4o-mini
# VITE_AI_TEMPERATURE=0.2
# VITE_AI_MAX_TOKENS=4096
```

> **Note:** Never commit real secrets. Keep `.env` local / in your host’s env settings.

### Run

```bash
bun run dev
```

App opens at [http://localhost:5173](http://localhost:5173).

### Build & preview

```bash
bun run build
bun run preview
```

### Lint

```bash
bun run lint
```

---

## Project Structure

```
src/
├── components/          # Shared UI (Logo, EmptyState, ErrorState, Skeleton, …)
├── context/             # Theme provider
├── features/
│   ├── ai/              # Incident Assistant
│   ├── auth/            # Landing, About, Pricing, Profile, login
│   ├── dashboard/       # Analytics dashboard
│   ├── errors/          # 404 / 403 pages
│   ├── incidents/       # Upload, list, detail, history
│   └── settings/        # Settings
├── layouts/             # Dashboard + empty (marketing) layouts
├── routes/              # AppRoutes
├── services/            # Axios instance + auth refresh interceptor
└── utils/               # Toast helpers, API error mapping
```

---

## App Routes

| Path | Description |
|---|---|
| `/` | Landing |
| `/about` | About & founder |
| `/pricing` | Pricing plans |
| `/dashboard` | Analytics |
| `/upload` | Upload incident |
| `/incidents` | Incident list |
| `/incidents/:id` | Incident detail + AI / runbook |
| `/assistant` | Incident chat |
| `/history` | Filtered history |
| `/settings` | Settings |
| `/profile` | Profile |

---

## Authentication Flow

1. User signs in with **Google** on the landing page  
2. Frontend sends `idToken` → `POST /auth/google-auth`  
3. Backend sets **httpOnly** `accessToken` + `refreshToken` cookies  
4. App navigates to `/dashboard`  
5. Axios uses `withCredentials: true` on all API calls  
6. On `401` with `ACCESS_TOKEN_MISSING` / `INVALID_ACCESS_TOKEN` / `TOKEN_EXPIRED` → `POST /auth/refresh-token` → retry  
7. If refresh fails → redirect to `/`

---

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run lint` | Run Oxlint |

---

## Deployment (Vercel)

1. Connect the GitHub repo to Vercel  
2. Set env vars: `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`  
3. Deploy — `vercel.json` rewrites all routes to `index.html` for SPA support  

Ensure the backend CORS / cookie settings allow your Vercel origin (`SameSite=None; Secure` for cross-site cookies).

---

## Author

**Jitendra Kumar Rana** — Founder & Backend Engineer  

- GitHub: [RaNaJitu](https://github.com/RaNaJitu)  
- LinkedIn: [jitendrakumarrana](https://www.linkedin.com/in/jitendrakumarrana/)  
- X: [@bravejeet](https://x.com/bravejeet)  
- Email: [jitendra.2609.jk@gmail.com](mailto:jitendra.2609.jk@gmail.com)

---

## License

Private / hackathon project. All rights reserved unless otherwise stated.
