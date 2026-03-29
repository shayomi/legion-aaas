"""
packs.py - Skill-pack registry and lightweight stack detection.
"""

import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Pack:
    name: str
    aliases: tuple[str, ...]
    category: str
    summary: str


PACKS: tuple[Pack, ...] = (
    Pack("react", (), "frontend", "React app conventions and component patterns"),
    Pack("nextjs", ("next",), "frontend", "Next.js App Router conventions and helpers"),
    Pack("tailwind", (), "frontend", "Tailwind CSS design tokens and utility patterns"),
    Pack(
        "typescript",
        ("ts",),
        "frontend",
        "TypeScript strict typing and project helpers",
    ),
    Pack(
        "supabase",
        (),
        "database-sql-cloud",
        "Supabase client, local stack, typed helpers",
    ),
    Pack("neon", (), "database-sql-cloud", "Neon serverless Postgres with Drizzle ORM"),
    Pack(
        "planetscale",
        ("ps",),
        "database-sql-cloud",
        "PlanetScale serverless MySQL with Drizzle ORM",
    ),
    Pack(
        "cockroachdb",
        ("cockroach", "crdb"),
        "database-sql-cloud",
        "CockroachDB Serverless with Drizzle ORM",
    ),
    Pack("turso", ("libsql",), "database-sql-cloud", "Turso libSQL with Drizzle ORM"),
    Pack(
        "railway-postgres",
        ("railway",),
        "database-sql-cloud",
        "Railway Postgres with SSL and Drizzle ORM",
    ),
    Pack("xata", (), "database-sql-cloud", "Xata serverless Postgres with search"),
    Pack(
        "postgres",
        ("pg", "postgresql"),
        "database-sql-local",
        "Docker Postgres 16 with Drizzle ORM",
    ),
    Pack(
        "mysql",
        ("mysql2", "mariadb"),
        "database-sql-local",
        "Docker MySQL 8 with Drizzle ORM",
    ),
    Pack(
        "sqlite", ("sqlite3",), "database-sql-local", "better-sqlite3 with Drizzle ORM"
    ),
    Pack(
        "timescaledb",
        ("timeseries", "tsdb"),
        "database-sql-local",
        "TimescaleDB with time-series helpers",
    ),
    Pack(
        "mongodb",
        ("mongo",),
        "database-nosql",
        "MongoDB with Mongoose and local Docker helper",
    ),
    Pack(
        "upstash-redis",
        ("redis", "upstash"),
        "database-nosql",
        "Upstash Redis client and cache helpers",
    ),
    Pack(
        "firebase-firestore",
        ("firebase", "firestore"),
        "database-nosql",
        "Firebase Admin SDK and Firestore helpers",
    ),
    Pack(
        "redis-local",
        ("redis-docker", "ioredis"),
        "database-nosql",
        "Docker Redis with ioredis helpers",
    ),
    Pack(
        "dynamodb",
        ("dynamo",),
        "database-nosql",
        "AWS DynamoDB with local emulator helpers",
    ),
    Pack("strapi", (), "backend-stack", "Strapi CMS with Docker Compose stack"),
    Pack(
        "appwrite", ("aw",), "backend-stack", "Appwrite stack for DB, auth, and storage"
    ),
    Pack(
        "pocketbase",
        ("pb",),
        "backend-stack",
        "PocketBase container and realtime-ready JS SDK",
    ),
    Pack(
        "prisma", ("orm",), "orm", "Prisma ORM with schema, migrations, and seed script"
    ),
    Pack(
        "drizzle", (), "orm", "Drizzle ORM standalone with schema and migration runner"
    ),
    Pack("clerk", (), "auth-ui", "Clerk auth with middleware and auth pages"),
    Pack("oauth", (), "auth-ui", "Auth.js v5 with GitHub and Google providers"),
    Pack("shadcn", (), "auth-ui", "shadcn/ui base component library"),
    Pack(
        "openai", ("ai", "gpt"), "ai", "OpenAI SDK with streaming chat and embeddings"
    ),
    Pack(
        "pinecone",
        ("vectors", "vectordb"),
        "ai",
        "Pinecone vector store and RAG helpers",
    ),
    Pack("qdrant", ("vector-search",), "ai", "Qdrant vector store and semantic search"),
    Pack(
        "stripe",
        ("payments",),
        "payments",
        "Stripe Checkout, webhooks, and billing portal",
    ),
    Pack(
        "lemonsqueezy",
        ("lemon", "ls"),
        "payments",
        "LemonSqueezy checkout and subscriptions",
    ),
    Pack("resend", ("email",), "email", "Resend client and React Email templates"),
    Pack("postmark", (), "email", "Postmark transactional email helpers"),
    Pack(
        "sentry",
        ("errors", "monitoring"),
        "observability",
        "Sentry error and performance monitoring",
    ),
    Pack(
        "posthog",
        ("analytics", "ph"),
        "analytics",
        "PostHog analytics, flags, and replay",
    ),
    Pack("plausible", (), "analytics", "Plausible privacy-first analytics"),
    Pack("bullmq", ("queue", "bull"), "jobs", "BullMQ queue workers and dashboard"),
    Pack("inngest", ("jobs",), "jobs", "Inngest event-driven background jobs"),
    Pack("trigger-dev", ("trigger",), "jobs", "Trigger.dev job orchestration"),
    Pack(
        "meilisearch",
        ("search", "meili"),
        "search",
        "Meilisearch with instant search helpers",
    ),
    Pack("typesense", (), "search", "Typesense fast search collections"),
    Pack("s3-storage", ("s3", "aws"), "storage", "AWS S3 uploads with presigned URLs"),
    Pack(
        "cloudflare-r2",
        ("r2", "cf"),
        "storage",
        "Cloudflare R2 presigned upload helpers",
    ),
    Pack("minio", ("object-storage",), "storage", "MinIO local object storage"),
    Pack(
        "env-validate",
        ("zod-env", "env-validation"),
        "developer-tools",
        "Typed env validation with Zod",
    ),
    Pack(
        "vitest", ("test", "tests"), "testing", "Vitest with coverage and example test"
    ),
    Pack("playwright", ("e2e",), "testing", "Playwright E2E tests and CI workflow"),
    Pack("dockerize", ("docker",), "devops", "Dockerfile, compose, and health checks"),
    Pack(
        "github-actions",
        ("ci", "gh", "github-ci"),
        "devops",
        "GitHub Actions CI/CD and Dependabot",
    ),
)


def list_packs() -> list[Pack]:
    return list(PACKS)


def resolve_pack_name(name: str) -> str | None:
    lowered = name.strip().lower()
    for pack in PACKS:
        if lowered == pack.name or lowered in pack.aliases:
            return pack.name
    return None


def resolve_pack_names(names: list[str]) -> tuple[list[str], list[str]]:
    resolved: list[str] = []
    unknown: list[str] = []

    for name in names:
        canonical = resolve_pack_name(name)
        if not canonical:
            unknown.append(name)
            continue
        if canonical not in resolved:
            resolved.append(canonical)

    return resolved, unknown


def install_packs(root: str | Path, names: list[str]) -> tuple[list[Path], list[str]]:
    root_path = Path(root)
    packs_dir = root_path / ".legion" / "packs"
    packs_dir.mkdir(parents=True, exist_ok=True)

    resolved, unknown = resolve_pack_names(names)
    created: list[Path] = []
    records: list[dict[str, str | list[str]]] = []

    for pack_name in resolved:
        pack = next(pack for pack in PACKS if pack.name == pack_name)
        path = packs_dir / f"{pack.name}.md"
        content = (
            f"# Pack: {pack.name}\n\n"
            f"- Category: {pack.category}\n"
            f"- Aliases: {', '.join(pack.aliases) if pack.aliases else 'none'}\n"
            f"- Summary: {pack.summary}\n\n"
            "## Install intent\n"
            "- This pack was selected by LEGION for this repository.\n"
            "- Use it as the local contract for future SaaS sync and automation.\n"
        )
        path.write_text(content, encoding="utf-8")
        created.append(path)
        records.append(
            {
                "name": pack.name,
                "aliases": list(pack.aliases),
                "category": pack.category,
                "summary": pack.summary,
            }
        )

    index_path = packs_dir / "index.json"
    index_path.write_text(
        json.dumps({"packs": records, "unknown": unknown}, indent=2), encoding="utf-8"
    )
    created.append(index_path)
    return created, unknown


def detect_recommended_packs(files: list[dict]) -> list[str]:
    file_paths = {item["path"] for item in files}
    corpus = "\n".join(f"{item['path']}\n{item['content'][:1500]}" for item in files)
    lowered = corpus.lower()
    recommended: list[str] = []

    def add(name: str) -> None:
        if name not in recommended:
            recommended.append(name)

    if (
        "web/package.json" in file_paths
        or "next.config.mjs" in file_paths
        or '"next"' in lowered
    ):
        add("nextjs")
    if '"react"' in lowered:
        add("react")
    if "tailwind.config.ts" in file_paths or "tailwindcss" in lowered:
        add("tailwind")
    if "class-variance-authority" in lowered or "components.json" in file_paths:
        add("shadcn")
    if '"typescript"' in lowered or "tsconfig.json" in file_paths:
        add("typescript")
    if "drizzle" in lowered:
        add("drizzle")
    if "prisma" in lowered:
        add("prisma")
    if "supabase" in lowered:
        add("supabase")
    if "neon" in lowered:
        add("neon")
    if "postgres" in lowered or "psycopg" in lowered:
        add("postgres")
    if "mysql" in lowered or "mariadb" in lowered:
        add("mysql")
    if "sqlite" in lowered:
        add("sqlite")
    if "clerk" in lowered:
        add("clerk")
    if "nextauth" in lowered or "auth.js" in lowered:
        add("oauth")
    if "sentry" in lowered:
        add("sentry")
    if "posthog" in lowered:
        add("posthog")
    if "playwright" in lowered:
        add("playwright")
    if "vitest" in lowered:
        add("vitest")
    if "docker" in lowered or "docker-compose" in lowered:
        add("dockerize")
    if ".github/workflows" in lowered or "github actions" in lowered:
        add("github-actions")

    return recommended
