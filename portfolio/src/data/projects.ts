export type Domain =
  | 'cybersecurity'
  | 'backend'
  | 'lowlevel'
  | 'ai-engineering'
  | 'agentic-ai'
  | 'webscraping'
  | 'polymath';

export interface ProjectSlice {
  domain: Domain;
  /** One-line label for what part of the project this slice represents. */
  headline: string;
  /** Concrete bullets — what was actually built in this slice. */
  bullets: string[];
  /** Optional tech stack tags shown alongside the slice. */
  tech?: string[];
}

export interface Project {
  name: string;
  blurb: string;
  url: string;
  primaryLanguage: string;
  featured?: boolean;
  slices: ProjectSlice[];
}

/* ------------------------------------------------------------------ */
/* Domain registry — index numbers keep section ordering consistent.  */
/* ------------------------------------------------------------------ */

export interface DomainConfig {
  key: Domain;
  index: string;
  kicker: string;
  title: string;
  blurb: string;
}

export const DOMAINS: readonly DomainConfig[] = [
  {
    key: 'cybersecurity',
    index: '04',
    kicker: 'Cybersecurity',
    title: 'Threat models & hardening.',
    blurb:
      'STRIDE-driven thinking, parameterized everything, secrets in env, role-gated admin paths.',
  },
  {
    key: 'backend',
    index: '05',
    kicker: 'Backend development',
    title: 'Services that hold up.',
    blurb:
      'Typed APIs, audit logs, prepared statements, scrapers and sync layers that survive bad networks.',
  },
  {
    key: 'lowlevel',
    index: '06',
    kicker: 'C++ · low-level',
    title: 'Closer to the metal.',
    blurb:
      'Parsers, lexers, AST passes, graph algorithms and CMake builds. Where determinism matters more than ergonomics.',
  },
  {
    key: 'ai-engineering',
    index: '07',
    kicker: 'AI engineering',
    title: 'Pipelines around models.',
    blurb:
      'Local-first evaluation, judge models, prompt-strategy comparisons, statistical detectors, provider-agnostic adapters.',
  },
  {
    key: 'agentic-ai',
    index: '08',
    kicker: 'Agentic AI',
    title: 'Many agents, one DAG.',
    blurb:
      'Long-lived planners, ephemeral workers, isolated MCP servers, deterministic file splices.',
  },
  {
    key: 'webscraping',
    index: '09',
    kicker: 'Web scraping · automation',
    title: 'Reading the web on purpose.',
    blurb:
      'Playwright-driven scrapers behind real logins, manifest-emitting pipelines, session-bootstrap captures, AWS Console overlays.',
  },
  {
    key: 'polymath',
    index: '10',
    kicker: 'Polymath margins',
    title: 'Things that don’t fit a box.',
    blurb:
      'Mobile, side experiments, gifts shipped as web pages, the megarepo of in-progress directions.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Projects — sliced across domains                                   */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    name: 'NeoTerritory',
    blurb:
      'Closed-lab research tool for deterministic C++ design-pattern detection. Codex docs are the source of truth; Claude implements against them.',
    url: 'https://github.com/JohnAndrewBalbarosa/NeoTerritory',
    primaryLanguage: 'TypeScript · C++',
    featured: true,
    slices: [
      {
        domain: 'cybersecurity',
        headline: 'STRIDE-modelled API surface for the testing cohort.',
        bullets: [
          'Full STRIDE table covering spoofing, tampering, repudiation, info-disclosure, DoS and EoP — each with the concrete mitigation in code.',
          'JWT bearer tokens on every protected route; admin routes additionally gated by `requireAdmin` (role === "admin").',
          'bcrypt (cost 10) for passwords; separate `LOG_DELETE_HASH` so an admin session compromise can’t wipe the audit trail.',
          'Input caps everywhere — source_text ≤ 1,000,000 chars, filename ≤ 256, microservice spawned per-request with a 30 s timeout.',
        ],
        tech: ['JWT', 'bcrypt', 'Fastify', 'STRIDE'],
      },
      {
        domain: 'backend',
        headline: 'Fastify TypeScript service + immutable analysis store.',
        bullets: [
          'Fastify route handlers with `jwtAuth` middleware; better-sqlite3 prepared statements for every query.',
          'Analysis runs are write-once; every state change emits a row in the `logs` table (event_type, user_id, message).',
          'Two deploy modes — Mode A hot-reload (Vite HMR + tsx watch, no Docker) and Mode B Docker container `neoterritory:latest` on :3001 with a baked-in microservice binary + catalog.',
          'Per-component rebuild scripts (`microservice.sh`, `frontend.sh`, `backend.sh`, `docker.sh`) orchestrated by `scripts/rebuild.sh`.',
        ],
        tech: ['Fastify', 'TypeScript', 'better-sqlite3', 'Docker'],
      },
      {
        domain: 'lowlevel',
        headline: 'C++ microservice — the deterministic detection core.',
        bullets: [
          'Owns parsing, hashing, pattern dispatch, documentation tagging, rendering and the report pipeline.',
          'Modules split header/source; CMake build with editor-side `CMakeSettings.json` and `CppProperties.json` for IntelliSense parity.',
          'Thin `main.cpp` entrypoint delegates to a syntactic broken-AST runner — the runtime owns CLI validation, file discovery, pipeline execution and diagnostics.',
          'Catalog of detection patterns shipped as static JSON next to the binary.',
        ],
        tech: ['C++17', 'CMake', 'AST'],
      },
      {
        domain: 'ai-engineering',
        headline: 'Deterministic structural detection BEFORE the AI step.',
        bullets: [
          'Working motto: deterministic structural detection comes first — AI is downstream of evidence, never the source of truth.',
          'Pattern catalog drives dispatch; LLM is asked to reason ABOUT detected evidence, not to invent it.',
          'Manual-review endpoint records the human verdict (`pattern` / `none` / `other`) on a specific source line — kept as labelled training-grade signal.',
        ],
        tech: ['catalog-driven', 'evidence-first'],
      },
      {
        domain: 'webscraping',
        headline: 'Playwright scratch dir for catalog-feeding scrapes.',
        bullets: [
          'Dedicated `playwright-scratch/scraper/run.mjs` bench (npm script `dev:scraper`) for pulling source corpus + reference patterns into the catalog.',
          'Outputs feed the C++ detector’s pattern catalog — scrapes are write-once into `samples/` and `pattern_catalog/`.',
        ],
        tech: ['Playwright', 'Node.js'],
      },
    ],
  },

  {
    name: 'MCP — Custom Orchestration Engine',
    blurb:
      'A python orchestration engine for multi-agent code edits. Long-lived planner, ephemeral workers, isolated FileSystem servers — all editing through bounded line ranges.',
    url: 'https://github.com/JohnAndrewBalbarosa/MCP',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'agentic-ai',
        headline: 'Researcher → Planner → ephemeral workers → MCP servers.',
        bullets: [
          'Long-lived research agent emits a structured brief; planner builds a DAG with strict `target_file / start_line / end_line` bounds per node.',
          'Ephemeral developer workers each execute one linear path until a branch point — never write files directly.',
          'FileSystem MCP server is the only thing that can mutate code: `get_snippet` then `apply_snippet` performs a deterministic splice.',
          'Provider-agnostic LLM gateway — OpenAI + Gemini via official SDKs, Qwen via HuggingFace InferenceClient with pooled concurrency.',
        ],
        tech: ['Python', 'MCP', 'DAG scheduling'],
      },
      {
        domain: 'webscraping',
        headline: 'Phase-0 Playwright session bootstrap for UI-only providers.',
        bullets: [
          'Headless browser performs login to a UI-only LLM endpoint; network observer captures auth headers, cookies, request body pattern and anti-CSRF fields.',
          'Session artifacts are encrypted and saved so subsequent calls run browserless against a raw HTTP profile (url, required headers, body template, retry/rate-limit settings).',
          'Skipped automatically when an SDK-backed provider is configured — server reads its session profile from env directly.',
        ],
        tech: ['Playwright', 'browser interception', 'session capture'],
      },
    ],
  },

  {
    name: 'Andrew Mini-Compiler',
    blurb:
      'A teaching mini-language with a real lexer, parser, and semantic analysis. Built for CS0035 — Programming Languages.',
    url: 'https://github.com/JohnAndrewBalbarosa/Andrew-mini-compiler',
    primaryLanguage: 'C++',
    slices: [
      {
        domain: 'lowlevel',
        headline: 'Lex → parse → semantic — three phases, all C++17.',
        bullets: [
          'Tokenises a tiny imperative language (`var`, `input`, `output` + `+ - * / ^`) into a real token stream.',
          'CFG/CNF-driven syntax analysis emits a parse tree; semantic analysis enforces declaration checks and basic validity.',
          'CMake 3.16+ build, Windows + POSIX runners (`run-mini-compiler.ps1`), with a `compiler-web` companion surface.',
        ],
        tech: ['C++17', 'CMake', 'Lexer/Parser/AST'],
      },
    ],
  },

  {
    name: 'Prompt Engineering for Research (Ollama)',
    blurb:
      'Local-first prompt-strategy experiment on GSM8K. Ollama for both generation and judge; optional HF auto-fetch for the dataset.',
    url: 'https://github.com/JohnAndrewBalbarosa/Prompt-Engineering-for-Research-Ollama-Based',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'ai-engineering',
        headline: 'Compares prompt strategies, then judges itself.',
        bullets: [
          'Fixed local model setup (currently `llama3.1:8b`); strategies are the only thing that varies between runs.',
          'Final-answer parsing + exact-match correctness, plus an optional rubric-based judge model run.',
          'Dedicated llama3.1 confusion checker emits TP/TN/FP/FN per item — structured outputs land in versioned files for analysis.',
          'Tunable concurrency / backoff via env (`OLLAMA_GENERATION_BUCKET`, `OLLAMA_JUDGE_BUCKET`, retry caps) so you can pin a GPU without melting it.',
        ],
        tech: ['Python', 'Ollama', 'GSM8K', 'judge-model'],
      },
    ],
  },

  {
    name: 'MusicScanIter',
    blurb:
      'Scans a music library, asks Gemini in batches for metadata suggestions, then writes tags and optionally relocates files into a target tree.',
    url: 'https://github.com/JohnAndrewBalbarosa/MusicScanIter',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'ai-engineering',
        headline: 'Batched Gemini metadata suggestions + write-back.',
        bullets: [
          'Reads existing audio tags, batches tracks to Gemini, writes accepted tags back to the file.',
          'Modular runtime — `runtime_control` (cli + config + types), `metadata_processing` (audio + research + service), `file_organization` (organizer).',
          'Optional file relocation into a target folder structure once tags are confirmed.',
        ],
        tech: ['Python', 'Gemini API'],
      },
    ],
  },

  {
    name: 'Casper Agent Starter (Build Day Manila 2026)',
    blurb:
      'A starter template for a live AI guessing-game agent — frame capture via LiveKit, prompt-driven analysis, server submission.',
    url: 'https://github.com/JohnAndrewBalbarosa/build-day-manila-2026-starter-pack',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'agentic-ai',
        headline: 'Three-package agent: core / agent / api, strict boundaries.',
        bullets: [
          '`core` owns frame capture + LiveKit streaming + the shared `Frame` type — locked from edits.',
          '`agent` owns runtime orchestration and the `analyze(frame)` prompt; `api` is the HTTP client to the game server.',
          'Two flows — practice (local camera, no server) and live (`get_feed → start_stream → analyze → guess`).',
        ],
        tech: ['Python', 'uv', 'LiveKit'],
      },
    ],
  },

  {
    name: 'Paraverse Module Translator',
    blurb:
      'Scrapes the current term from FEU Paraverse, then exports translated HTML for every module while preserving images and markup.',
    url: 'https://github.com/JohnAndrewBalbarosa/Paraverse-Module-Translator',
    primaryLanguage: 'JavaScript',
    slices: [
      {
        domain: 'webscraping',
        headline: 'Authenticated FEU Paraverse scrape with current-term detection.',
        bullets: [
          'Detects the first pending column after fully-passed columns to identify the current term — irregular-student flow has a guarded placeholder.',
          'Pre-translation review menu lets you validate module counts, re-scan strict vs relaxed, or abort.',
          'Outputs a `manifest.json` linking courses to module URLs + an optional `audit-strict-vs-relaxed.json` diff report.',
          'Scraper runs locally with the user’s own login session — Paraverse is auth-protected, so no credentials in CI.',
        ],
        tech: ['Node.js', 'Playwright', 'manifest.json'],
      },
      {
        domain: 'ai-engineering',
        headline: 'Provider-agnostic translation with isolated context per module.',
        bullets: [
          '`RESEARCH_PROVIDER` / `RESEARCH_MODEL` / `RESEARCH_API_KEY` configure any OpenAI-compatible endpoint.',
          'Fresh translator/chat instance per module page — no context bleed between pages.',
          'Terminal prompts for target language and translation style at runtime.',
        ],
        tech: ['OpenAI-compatible', 'i18n'],
      },
    ],
  },

  {
    name: 'GradesFeu',
    blurb:
      'Tooling for FEU Tech SOLAR — grade scraping + analysis, schedule availability, PNG schedule reports, optional professor mapping from Excel. Same `grades_checker` package powers ScheduleFeu.',
    url: 'https://github.com/JohnAndrewBalbarosa/GradesFeu',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'webscraping',
        headline: 'Authenticated SOLAR scrape into a replayable JSON snapshot.',
        bullets: [
          'Playwright (Chromium) drives the SOLAR session under your login; scrape result is cached as `solar_data.json` for replay.',
          'Layered package — `cli / config / logic / models / scraping / services` — separates the scrape transport from the parsing and analysis.',
          'Optional Excel professor-mapping layer reads the official term spreadsheet (openpyxl) to enrich the schedule output.',
          'Same package is published twice — `GradesFeu` (current) and `ScheduleFeu` (older snapshot) — both expose `grades-checker` + `schedule-checker` CLIs.',
        ],
        tech: ['Python', 'Playwright', 'openpyxl', 'rich'],
      },
      {
        domain: 'backend',
        headline: 'Schedule-availability analysis + PNG report generation.',
        bullets: [
          '`schedule-checker --group-size N` computes group-availability windows from the cached scrape and emits a PNG schedule (Pillow) into `src/.cache/schedule_report.png`.',
          'Pure-functional analysis layer — given the JSON snapshot, the entire report is reproducible without re-running the scrape.',
        ],
        tech: ['Python', 'Pillow'],
      },
    ],
  },

  {
    name: 'Legarda Workshop 3',
    blurb:
      'Local-first workshop runner — Playwright overlays on the AWS Console, presenter-driven WebSocket sync, usher dashboard for live help.',
    url: 'https://github.com/JohnAndrewBalbarosa/Legarda-Workshop-3',
    primaryLanguage: 'JavaScript',
    slices: [
      {
        domain: 'backend',
        headline: 'WebSocket sync over LAN with QR-code fallback.',
        bullets: [
          'Presenter runs a `ws` server at a static rarely-used IP (10.250.250.1:5050); participants auto-connect or fall back to a presenter-generated QR.',
          'Usher dashboard subscribes on a separate port (5051) — receives stuck-step + seat-number from each participant.',
          'Step-completion events aggregate in-memory or to a small JSON/SQLite for post-event reporting.',
        ],
        tech: ['Node.js', 'ws', 'SQLite'],
      },
      {
        domain: 'webscraping',
        headline: 'Headful Chromium overlays directly on the live AWS Console.',
        bullets: [
          'Playwright in headful mode injects React overlays via `page.evaluate` — blinking highlights, navigation cues anchored to AWS selectors.',
          'VS Code browser-agent observes both its own navigation and the developer’s manual clicks to build a deterministic step list — turns the Console itself into the deck.',
          'No CDN reliance — assets are local-only; the workshop runs offline against the LAN.',
        ],
        tech: ['Playwright', 'browser-agent', 'AWS Console'],
      },
    ],
  },

  {
    name: 'N.E.W Procurement Intelligence',
    blurb:
      'Private business-analysis tool for N.E.W staff — daily sales, break-even, AI-assisted demand forecast, full audit logging on save and delete.',
    url: 'https://github.com/JohnAndrewBalbarosa/Feasability-Study-Website',
    primaryLanguage: 'TypeScript',
    slices: [
      {
        domain: 'backend',
        headline: 'Next.js 14 App Router + Supabase + Google email allowlist.',
        bullets: [
          '8-step daily workflow — costs and products entered once, sales entered each day, analysis runs on demand.',
          'Auth restricted to `ALLOWED_GOOGLE_EMAILS` (comma list); service-role key kept server-side only.',
          'Every save and delete is logged to Supabase as an audit row — the procurement decision trail is the product.',
          'Lock mode prevents accidental edits to setup data while entering the daily numbers.',
        ],
        tech: ['Next.js 14', 'Supabase', 'Postgres', 'GSAP'],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Egoist megarepo sub-projects — distinct work under one umbrella    */
  /* ------------------------------------------------------------------ */

  {
    name: 'Egoist · textAIChecker',
    blurb:
      'A statistical AI-text detector that operates without any model — built from token-level information-theoretic features.',
    url: 'https://github.com/JohnAndrewBalbarosa/Egoist/tree/main/personalProject/textAIChecker',
    primaryLanguage: 'Python',
    slices: [
      {
        domain: 'ai-engineering',
        headline: 'No-model AI-text detection via burstiness + lexical features.',
        bullets: [
          'Computes type-token ratio, comma ratio, rare-word ratio (vs Zipf frequency cutoff), average sentence length, sentence variance, and burstiness (σ/μ on lengths).',
          'Sentence-length distribution with configurable scale + rounding — measures how much text concentrates around a target window vs spreads.',
          'Tokenisation via NLTK (`punkt` / `punkt_tab`); rare-word scoring via `wordfreq` (Zipf scale).',
          'Deterministic + offline — no API calls, no model weights. The rubric is the algorithm.',
        ],
        tech: ['Python', 'nltk', 'wordfreq', 'numpy'],
      },
    ],
  },

  {
    name: 'Egoist · Competitive C++',
    blurb:
      'Codeforces-style problem solutions in C++ — bit manipulation, ad-hoc, greedy, implementation.',
    url: 'https://github.com/JohnAndrewBalbarosa/Egoist/tree/main/competitiveProgramming/C%2B%2B',
    primaryLanguage: 'C++',
    slices: [
      {
        domain: 'lowlevel',
        headline: 'Hand-written CP solutions — bits, strings, ad-hoc.',
        bullets: [
          'A-Bit++, A-Team, A-Watermelon, A-WayTooLongWords, ABflipping, bits, bitstrings, weirdAlgorithm and friends.',
          'Direct-to-stdout C++ — no framework, no STL contortions; one .cpp per problem, one binary per .cpp.',
          'Compile target lives next to the source (e.g. `A-WayTooLongWords.exe`) — same workflow as the FEU CP grind.',
        ],
        tech: ['C++', 'Codeforces', 'CP grind'],
      },
    ],
  },

  {
    name: 'Egoist · FinalProjectAlgo (Dijkstra Routing)',
    blurb:
      'CS0007 Algorithm final — passenger-routing system over a weighted graph using Dijkstra.',
    url: 'https://github.com/JohnAndrewBalbarosa/Egoist/tree/main/academics/Final%20Projects/FinalProjectAlgo',
    primaryLanguage: 'C++',
    slices: [
      {
        domain: 'lowlevel',
        headline: 'Dijkstra shortest-path over a passenger-route graph.',
        bullets: [
          'Modular C++ split — `data.h` / `function.h` for graph + utility types, `dijkstra.cpp` for the algorithm core.',
          '`passenger.cpp` + `routeSpecs.cpp` model passenger demand and route metadata that feed the shortest-path solver.',
          '`menu.cpp` is the CLI — text-driven interaction with the routing engine, no GUI dependencies.',
          'Closed the loop on CS0007 (Algorithm) — final mark 4.00.',
        ],
        tech: ['C++', 'Dijkstra', 'graphs'],
      },
    ],
  },

  {
    name: 'Mobile Programming (FEU Tech)',
    blurb:
      'Coursework for CS0011 — Mobile Programming at FEU Tech, Kotlin / Android.',
    url: 'https://github.com/JohnAndrewBalbarosa/Mobile-Programming',
    primaryLanguage: 'Kotlin',
    slices: [
      {
        domain: 'polymath',
        headline: 'Kotlin / Android exercises (CS0011 — final grade 4.00).',
        bullets: [
          'Standard Android project layout — `main`, `test`, `androidTest` sources.',
          'Exercises track activity lifecycle, view binding, and intent flow against the FEU Tech rubric.',
        ],
        tech: ['Kotlin', 'Android'],
      },
    ],
  },
];
