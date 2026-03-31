# WorldTracker

An interactive country comparison platform that tracks and visualises national performance across six key sectors using the **House Index** — a weighted composite score covering healthcare, education, economy, safety, environment, and infrastructure.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Backend (optional)**: Supabase
- **Deployment**: Vercel

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase project URL and anon key (optional for Phase 1 — the app runs fully on static data without Supabase).

### 3. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Add the following environment variables in the Vercel dashboard (optional):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

Vercel will automatically detect Next.js and configure the build settings.

## Project Structure

```
worldtracker/
├── app/
│   ├── about/
│   │   └── page.tsx          # About & methodology page
│   ├── custom/
│   │   └── page.tsx          # Custom Index page
│   ├── sector/
│   │   └── [slug]/
│   │       └── page.tsx      # Dynamic sector detail pages
│   ├── globals.css           # Global styles + Tailwind directives
│   ├── layout.tsx            # Root layout with nav & providers
│   └── page.tsx              # Homepage
├── components/
│   ├── ClientProviders.tsx   # Wraps client-side context providers
│   ├── CountryLineChart.tsx  # Recharts line chart component
│   ├── CustomIndexClient.tsx # Custom weightings UI
│   ├── HomeClient.tsx        # Homepage chart + sector cards
│   ├── Navigation.tsx        # Sticky top navigation bar
│   └── SectorDetailClient.tsx # Sector detail chart + indicators
├── context/
│   └── CountryContext.tsx    # Selected country global state
├── lib/
│   ├── calculations.ts       # House Index & chart data helpers
│   ├── config.ts             # Countries, sectors, weightings config
│   ├── data.ts               # All historical sector score data
│   └── supabase.ts           # Supabase client (optional)
├── .env.local.example        # Environment variable template
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | House Index chart + sector score cards for selected country |
| `/sector/[slug]` | Sector-specific chart + sub-indicator breakdown |
| `/custom` | Adjust sector weightings to build a custom House Index |
| `/about` | Methodology, data sources, and project information |

## Phase 1 Notes

- **Data**: All sector scores are illustrative, based on publicly available data from the OECD, World Bank, Eurostat, and national statistics agencies. Scores are normalised to a 0–100 scale.
- **Countries**: United Kingdom, Germany, France, Ireland, Spain.
- **Time range**: 2014–2024 (11 data points per series).
- **Supabase**: Included as a dependency for Phase 2 integration (user accounts, saved custom indices, comments). Not required to run the app in Phase 1.
- **Custom Index**: Weightings do not need to sum to 100% — the calculation normalises proportionally. A warning is shown when the total differs from 100%.
