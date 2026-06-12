export interface FeaturedProject {
  id: string
  name: string
  label: string
  tagline: string
  /** Narrative paragraphs — problem, approach, proof. */
  narrative: string[]
  /** Short fact pairs rendered as a spec list. */
  facts: { term: string; detail: string }[]
  tech: string[]
  year: string
  github: string
  visual: 'terminal' | 'storefront'
}

export interface CompactProject {
  id: string
  name: string
  tagline: string
  detail: string
  tech: string[]
  year: string
  github: string
}

export const featured: FeaturedProject[] = [
  {
    id: '01',
    name: 'CauseTrace',
    label: 'Developer tooling',
    tagline: 'Which commit broke the build — answered deterministically.',
    narrative: [
      'Given a failing test’s stack trace and a bounded commit window, CauseTrace ranks the commits most likely to have caused the regression. The parser extracts files, line numbers, and function names from the trace; each commit in the window is scored against that failure context.',
      'Ranking is driven by seven explainable signals — file overlap, line proximity, function overlap, caller–callee propagation, recency, a commit-size penalty, and a single-file focus bonus. No AI at ranking time: the scoring is fully deterministic, so every candidate comes with a signal-by-signal breakdown of why it ranked. LLM reasoning enters only afterwards, to narrate a causal explanation from evidence that’s already been narrowed.',
      'Evaluated against a curated benchmark of twelve real regressions drawn from Flask, Werkzeug, Pytest, Requests, and urllib3 — each with a verified causal commit as ground truth. Current result: 12/12 top-1. Cases get removed if their causality doesn’t hold up under investigation; corpus integrity outranks the accuracy number.',
    ],
    facts: [
      { term: 'Benchmark', detail: '12/12 top-1 on real regressions' },
      { term: 'Corpus', detail: 'Flask, Werkzeug, Pytest, Requests, urllib3' },
      { term: 'Signals', detail: '7 deterministic, individually explainable' },
      { term: 'CI', detail: 'Reconstructs failure context from GitHub Actions logs' },
    ],
    tech: ['Python', 'GitPython', 'GitHub Actions', 'OpenRouter API'],
    year: '2025',
    github: 'https://github.com/azfar-05/cause-trace',
    visual: 'terminal',
  },
  {
    id: '02',
    name: 'HAP',
    label: 'Shipped for a client',
    tagline: 'A storefront for a real home decor brand — built to be run by its owner.',
    narrative: [
      'HAP is a home decor and tableware brand that lived entirely on social media. I built them a product platform: a public catalog with category filtering, detail pages with image galleries, and inquiries that open WhatsApp with the product pre-filled — meeting their customers where they already buy.',
      'The part I cared most about is the half customers never see. The owner manages inventory, featured products, and hero imagery through an admin dashboard — Supabase handles auth, storage, and the database, with row-level security so public traffic can read the catalog but only the owner can write to it. Schema migrations and a seed script make the whole thing reproducible.',
      'Designed mobile-first with a warm editorial feel, because that’s where their audience is. Recently delivered, now in the brand’s hands.',
    ],
    facts: [
      { term: 'For', detail: 'A real brand and its customers' },
      { term: 'Admin', detail: 'Owner-operated dashboard, RLS-secured' },
      { term: 'Inquiries', detail: 'WhatsApp deep links, product pre-filled' },
      { term: 'Status', detail: 'Delivered, 2026' },
    ],
    tech: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    year: '2026',
    github: 'https://github.com/azfar-05/hap-website',
    visual: 'storefront',
  },
]

export const compact: CompactProject[] = [
  {
    id: '03',
    name: 'SEFI',
    tagline: 'CI/CD failure intelligence platform',
    detail:
      'Full-stack analytics over pipeline data — failure trends, flaky tests, regression-inducing commits, MTTR. PostgreSQL commit DAG with a recursive CTE for ancestry traversal; React/TypeScript dashboards with developer-level filtering.',
    tech: ['Node.js', 'PostgreSQL', 'React', 'TypeScript', 'Recharts'],
    year: '2025',
    github: 'https://github.com/azfar-05/sefi',
  },
  {
    id: '04',
    name: 'Machine Failure Prediction',
    tagline: 'Predictive maintenance, eight models compared',
    detail:
      'Failure prediction over 10,000 industrial machine records spanning five failure modes. Eight models benchmarked — XGBoost to Naive Bayes — on ROC-AUC, recall, and F1, with recall prioritised so failures don’t slip through. Streamlit dashboard for live prediction.',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'Streamlit'],
    year: '2024',
    github: 'https://github.com/azfar-05/machine-failure-prediction',
  },
]
