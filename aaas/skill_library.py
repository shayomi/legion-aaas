"""
skill_library.py - Broad LEGION skill catalog emitted into local artifacts.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class SkillEntry:
    name: str
    aliases: tuple[str, ...]
    category: str
    summary: str


def _make_entries(
    category: str, specs: list[tuple[str, tuple[str, ...], str]]
) -> list[SkillEntry]:
    return [
        SkillEntry(name=name, aliases=aliases, category=category, summary=summary)
        for name, aliases, summary in specs
    ]


SKILL_LIBRARY: tuple[SkillEntry, ...] = tuple(
    _make_entries(
        "frontend-core",
        [
            ("react", (), "React app architecture, hooks, and component patterns"),
            (
                "nextjs",
                ("next",),
                "Next.js App Router patterns and production delivery",
            ),
            ("tailwind", (), "Tailwind CSS utility architecture and design tokens"),
            ("shadcn", (), "shadcn/ui component system and extension patterns"),
            (
                "typescript",
                ("ts",),
                "TypeScript strict typing, utility types, and project setup",
            ),
            (
                "framer-motion",
                ("framer", "motion"),
                "Framer Motion transitions, gestures, and layout motion",
            ),
            ("remotion", (), "Remotion video rendering and walkthrough creation"),
            ("storybook", (), "Storybook component docs and UI test harness"),
            (
                "radix-ui",
                ("radix",),
                "Accessible primitives and design system composition",
            ),
            (
                "tanstack-query",
                ("react-query",),
                "Server-state fetching, caching, and optimistic updates",
            ),
            ("zustand", (), "Lightweight state store patterns"),
            (
                "redux-toolkit",
                ("redux",),
                "Redux Toolkit slices, async flows, and store setup",
            ),
            (
                "react-hook-form",
                ("rhf",),
                "Forms, validation, and complex field orchestration",
            ),
            ("zod", (), "Schema validation and typed parsing"),
            (
                "i18n",
                ("localization",),
                "Internationalization, locale routing, and translation workflows",
            ),
        ],
    )
    + _make_entries(
        "frontend-visualization",
        [
            (
                "echarts",
                ("charts", "chart"),
                "Apache ECharts dashboards and interactive chart patterns",
            ),
            ("chartjs", ("chart-js",), "Chart.js line, bar, pie, and mixed charts"),
            ("recharts", (), "Recharts for product dashboards and KPI views"),
            ("d3", (), "D3 custom visualization and data-driven interactions"),
            ("threejs", ("three",), "Three.js 3D scenes, animation, and interactions"),
            ("mapbox", ("maps",), "Interactive mapping and geospatial UI"),
            ("leaflet", (), "2D maps, overlays, and spatial data display"),
            ("mermaid", (), "Architecture and workflow diagrams in markdown docs"),
        ],
    )
    + _make_entries(
        "database-sql-cloud",
        [
            (
                "supabase",
                (),
                "Supabase client, local stack, auth, storage, and typed helpers",
            ),
            ("neon", (), "Neon serverless Postgres with Drizzle ORM"),
            ("planetscale", ("ps",), "PlanetScale serverless MySQL with Drizzle ORM"),
            (
                "cockroachdb",
                ("cockroach", "crdb"),
                "CockroachDB Serverless with Postgres-compatible patterns",
            ),
            ("turso", ("libsql",), "Turso libSQL edge-first setup with Drizzle"),
            (
                "railway-postgres",
                ("railway",),
                "Railway Postgres with SSL and deployment helpers",
            ),
            ("xata", (), "Xata serverless Postgres and built-in search flows"),
        ],
    )
    + _make_entries(
        "database-sql-local",
        [
            (
                "postgres",
                ("pg", "postgresql"),
                "Docker Postgres 16 and local dev helpers",
            ),
            ("mysql", ("mysql2", "mariadb"), "Docker MySQL 8 and schema workflows"),
            (
                "sqlite",
                ("sqlite3",),
                "SQLite file-based storage and zero-setup local mode",
            ),
            (
                "timescaledb",
                ("timeseries", "tsdb"),
                "TimescaleDB hypertables and time-series ingestion",
            ),
            ("sql-server", ("mssql",), "SQL Server local and hosted setup guidance"),
        ],
    )
    + _make_entries(
        "database-nosql",
        [
            (
                "mongodb",
                ("mongo",),
                "MongoDB local Docker and Atlas-ready CRUD patterns",
            ),
            (
                "upstash-redis",
                ("redis", "upstash"),
                "Redis cache, rate limits, and queue helpers",
            ),
            (
                "firebase-firestore",
                ("firebase", "firestore"),
                "Firestore CRUD and Admin SDK server flows",
            ),
            (
                "redis-local",
                ("redis-docker", "ioredis"),
                "Local Redis via Docker with ioredis",
            ),
            ("dynamodb", ("dynamo",), "DynamoDB cloud and local emulator patterns"),
            ("cassandra", (), "Wide-column modeling and query-first design"),
            ("meilisearch-db", ("search-db",), "Search-first data workflows"),
        ],
    )
    + _make_entries(
        "backend-stacks",
        [
            ("strapi", (), "Strapi CMS stack and content modeling"),
            ("appwrite", ("aw",), "Appwrite backend stack for auth, storage, and DB"),
            ("pocketbase", ("pb",), "PocketBase CRUD and realtime patterns"),
            ("fastapi", (), "FastAPI APIs, routers, auth, and async patterns"),
            ("nestjs", (), "NestJS modules, services, guards, and DTO patterns"),
            ("express", (), "Express server structure, middleware, and API setup"),
            ("hono", (), "Hono edge/server APIs across runtimes"),
            ("django", (), "Django apps, ORM, admin, and API layering"),
            (
                "laravel",
                (),
                "Laravel app structure, auth, queues, and Eloquent patterns",
            ),
            (
                "rails",
                ("ruby-on-rails",),
                "Rails MVC, jobs, and conventional app design",
            ),
        ],
    )
    + _make_entries(
        "orm-and-modeling",
        [
            ("prisma", ("orm",), "Prisma schema, migrations, and seed setup"),
            ("drizzle", (), "Drizzle schema, migrations, and typed SQL access"),
            ("sqlalchemy", (), "SQLAlchemy 2.0 models and session patterns"),
            ("typeorm", (), "TypeORM entities, repositories, and migrations"),
            ("mongoose", (), "Mongoose models and MongoDB documents"),
            ("pydantic", (), "Pydantic validation and API contracts"),
        ],
    )
    + _make_entries(
        "auth-and-security",
        [
            ("clerk", (), "Clerk auth flows and user management"),
            ("oauth", (), "Auth.js v5 with GitHub and Google providers"),
            ("nextauth", (), "NextAuth/Auth.js session, providers, and callbacks"),
            ("supabase-auth", (), "Supabase auth session and middleware setup"),
            ("firebase-auth", (), "Firebase auth client and admin flows"),
            ("jwt", (), "JWT issuance, refresh, and verification patterns"),
            ("rbac", (), "Role-based access control and authorization checks"),
            (
                "secrets-management",
                ("secrets",),
                "Secret handling, env validation, and secure storage",
            ),
        ],
    )
    + _make_entries(
        "ai-and-search",
        [
            ("openai", ("ai", "gpt"), "OpenAI chat, tools, and embeddings"),
            ("anthropic", ("claude",), "Claude API, prompts, and structured responses"),
            ("opencode", (), "OpenCode CLI and provider-driven coding workflows"),
            ("ollama", ("local-llm",), "Local OSS model execution via Ollama"),
            ("langchain", (), "LangChain chains, tools, and retrieval flows"),
            ("langgraph", (), "LangGraph stateful agent workflows"),
            ("pydantic-ai", (), "PydanticAI typed agent orchestration"),
            ("rag", (), "Retrieval-augmented generation pipelines"),
            (
                "pinecone",
                ("vectors", "vectordb"),
                "Pinecone vector database operations",
            ),
            ("qdrant", ("vector-search",), "Qdrant local/cloud vector search"),
            ("weaviate", (), "Weaviate vector and hybrid retrieval"),
            ("pgvector", (), "Postgres vector search patterns"),
            ("meilisearch", ("search", "meili"), "Search engine setup and indexing"),
            ("typesense", (), "Fast search collections and filters"),
        ],
    )
    + _make_entries(
        "payments-and-commerce",
        [
            ("stripe", ("payments",), "Stripe Checkout, billing portal, and webhooks"),
            (
                "lemonsqueezy",
                ("lemon", "ls"),
                "LemonSqueezy subscriptions and fulfillment",
            ),
            ("paypal", (), "PayPal checkout and recurring billing"),
            ("shopify", (), "Shopify storefront and app integrations"),
            ("woocommerce", (), "WooCommerce store setup and data sync"),
        ],
    )
    + _make_entries(
        "communication",
        [
            ("resend", ("email",), "Resend email delivery and React Email templates"),
            ("postmark", (), "Postmark transactional email templates and sends"),
            ("sendgrid", (), "SendGrid mail send and template workflows"),
            ("mailgun", (), "Mailgun email automation and routing"),
            ("twilio", ("sms",), "Twilio SMS, voice, and notification workflows"),
            ("slack", (), "Slack bot, channel, and notification workflows"),
            ("discord", (), "Discord bot and community automation"),
            ("whatsapp", (), "WhatsApp Cloud API integration"),
            ("telegram", (), "Telegram bot flows and notifications"),
            ("gmail", (), "Gmail automation and email workflows"),
        ],
    )
    + _make_entries(
        "observability-and-analytics",
        [
            (
                "sentry",
                ("errors", "monitoring"),
                "Error tracking, traces, and source maps",
            ),
            (
                "posthog",
                ("analytics", "ph"),
                "Product analytics, replay, and feature flags",
            ),
            ("plausible", (), "Privacy-first web analytics"),
            ("mixpanel", (), "Event analytics and funnel analysis"),
            ("amplitude", (), "Product analytics and cohort analysis"),
            ("grafana", (), "Dashboards, metrics, and alert views"),
            ("prometheus", (), "Metric collection and SLO signals"),
            ("datadog", (), "APM, logs, and metrics workflows"),
        ],
    )
    + _make_entries(
        "background-jobs-and-workflows",
        [
            ("bullmq", ("queue", "bull"), "Redis-backed queue processing"),
            ("inngest", ("jobs",), "Event-driven background jobs"),
            ("trigger-dev", ("trigger",), "Durable job orchestration"),
            ("temporal", (), "Workflow orchestration and retryable jobs"),
            ("celery", (), "Python async task queues"),
            ("airflow", (), "Data DAGs and scheduled orchestration"),
            ("n8n", (), "Workflow automation with nodes and expressions"),
            ("zapier", (), "No-code automation and app triggers"),
            ("make", ("integromat",), "Automation scenarios and app chaining"),
            (
                "github-actions",
                ("ci", "gh", "github-ci"),
                "CI/CD workflows and automation",
            ),
            ("gitlab-ci", (), "GitLab CI pipelines"),
            ("circleci", (), "CircleCI jobs and workflows"),
        ],
    )
    + _make_entries(
        "storage-and-media",
        [
            (
                "s3-storage",
                ("s3", "aws"),
                "S3 uploads, presigned URLs, and object management",
            ),
            (
                "cloudflare-r2",
                ("r2", "cf"),
                "R2 object storage and signed upload flows",
            ),
            ("minio", ("object-storage",), "Local S3-compatible object storage"),
            ("uploadthing", (), "Client/server uploads and hosted asset pipeline"),
            ("cloudinary", (), "Image/video transformations and uploads"),
            ("mux", (), "Video streaming and asset playback"),
        ],
    )
    + _make_entries(
        "testing-and-quality",
        [
            ("vitest", ("test", "tests"), "Unit testing and coverage"),
            ("playwright", ("e2e",), "E2E browser testing and automation"),
            ("jest", (), "JavaScript/TypeScript unit testing"),
            ("pytest", (), "Python test suites and fixtures"),
            ("cypress", (), "Browser E2E and component testing"),
            ("storybook-tests", (), "Visual and interaction tests in Storybook"),
            ("lighthouse", (), "Performance, SEO, and accessibility audits"),
            ("axe", (), "Accessibility testing workflows"),
            ("semgrep", (), "Static analysis and code scanning"),
            ("bandit", (), "Python security scanning"),
        ],
    )
    + _make_entries(
        "devops-and-deployment",
        [
            (
                "dockerize",
                ("docker",),
                "Dockerfile, compose, and local container setup",
            ),
            ("kubernetes", ("k8s",), "Kubernetes manifests and service deployment"),
            ("helm", (), "Helm charts and release management"),
            ("terraform", (), "Infrastructure as code and environment provisioning"),
            ("ansible", (), "Provisioning and server automation"),
            ("vercel", (), "Vercel deployment and Next.js hosting"),
            ("netlify", (), "Netlify deploy previews and hosting"),
            ("railway-deploy", (), "Railway services and hosted infra"),
            ("flyio", ("fly",), "Fly.io deploy and multi-region runtime"),
            ("cloudflare-workers", (), "Workers edge deploys and routing"),
            ("aws-lambda", (), "Lambda serverless functions"),
            ("azure-container-apps", (), "Azure container deployment patterns"),
            ("gcp-cloud-run", (), "Cloud Run containers and services"),
        ],
    )
    + _make_entries(
        "planning-and-collaboration",
        [
            (
                "github-issues",
                ("issues",),
                "Issue creation, templates, and backlog triage",
            ),
            (
                "github-projects",
                ("kanban",),
                "GitHub project boards and milestone planning",
            ),
            ("build-e2e", (), "End-to-end delivery planning and execution"),
            ("brainstorm", (), "Idea generation and problem framing"),
            ("prd", (), "Product requirements docs"),
            ("design-spec", (), "Design specifications and UX flows"),
            (
                "technical-spec",
                ("tech-spec",),
                "Technical implementation specifications",
            ),
            ("adr", (), "Architecture decision records"),
            (
                "sprint-planning",
                ("sprint",),
                "Iteration planning and execution scoping",
            ),
            ("roadmap", (), "Roadmap planning and sequencing"),
            ("retrospective", ("retro",), "Retrospectives and team learning"),
            ("onboarding", (), "Repo onboarding and setup guidance"),
        ],
    )
)


def list_skill_library() -> list[SkillEntry]:
    return list(SKILL_LIBRARY)
