# Muslimo: what's left before launch

An honest list of what stands between this codebase and real users, most important first. Each item says why it
matters, what to do, which files are involved, and a rough effort:

- **S**: under a day
- **M**: one to three days
- **L**: a week or more

[architecture.md](architecture.md) explains how the pieces fit together, and [INTERVIEW-QA.md](INTERVIEW-QA.md)
covers how to talk about these gaps in an interview.

## Where the release stands

From the repository alone (the dashboards hold the rest; see "Deployment and release" in
[architecture.md](architecture.md)):

| | State | Next step | Evidence |
| --- | --- | --- | --- |
| API | Configured: a Render Docker web service on the free plan, redeployed on every push, with a Neon Postgres database | Confirm it answers `GET /api/health` with `"database": "postgresql+psycopg"`; see item 8 | `render.yaml`, `backend/Dockerfile`, `docs/hosting.md` |
| iOS | 1.0.0 was rejected by App Review under guidelines 4 and 5.1.2(i); both fixed on `main` | Build, resubmit, and set `"ios"` in `site/app-version.json` once it's on the App Store | `src/ui/screens/AppleSignInButton.native.tsx`, `src/services/monetization.native.ts`, `site/app-version.json`, `docs/release.md` |
| Android | Build 14 is live on a Play track; uploads go to the internal track as drafts | Closed test with 12 testers for 14 days (new personal accounts), then production | `site/app-version.json`, `eas.json`, `docs/release.md` |
| Store checklist | "Production API served over HTTPS" still marked as needed before release | Tick it once the API URL is in the production EAS environment | `store/README.md`, `src/config/backend.ts` |

## Summary

| # | Item | Effort | Why it matters |
| --- | --- | --- | --- |
| 1 | [The app never calls the lesson, completion and progress endpoints](#1-wire-the-app-to-the-learning-endpoints) | L | Half the backend is dead code until it's wired up or deleted |
| 2 | [Grading happens on the phone](#2-grade-competitive-answers-on-the-server) | M (after 1) | Rankings and battles trust numbers the client sends |
| 3 | [Session token in AsyncStorage](#3-move-the-session-token-to-securestore) | S | A rooted phone or a backup exposes a 30-day login |
| 4 | [No password reset (or email verification)](#4-password-reset-and-email-verification) | M | A forgotten password locks the learner out for good |
| 5 | [Weak on-device password hash](#5-a-real-kdf-for-the-on-device-password) | S | The phone's copy of the account uses fast SHA-256 and `Math.random` salts |
| 6 | [First migration is `create_all`](#6-a-real-baseline-migration-and-postgres-in-ci) | M | The migration history isn't a true record; downgrades don't work |
| 7 | [Rate limiter in process memory](#7-move-the-rate-limiter-to-redis) | M | Wrong the moment there's a second instance or worker |
| 8 | [Hosting basics](#8-hosting-basics) | S | The free tier sleeps; no backups, error alerts, or CI gate on deploys |
| 9 | [Outdated Swagger file](#9-delete-the-outdated-swagger-file) | S | It describes an API that doesn't exist |
| 10 | [Smaller clean-ups](#10-smaller-clean-ups) | S each | N+1 queries, an old fallback, the 5,400-line `TopicApp.tsx` |

Fixed on the `claude/muslimo-fixes-v2` branch (exported as `patches-v2`), so not on this list once it's merged:
removing the old `backend/server.js` (its social login accepted any token), the lesson-completion XP hole, sync value
validation, the catalog `GROUP BY`, client subscription sync only in development, the Ummah ranking in SQL with an
index, a request-body size limit, the `socialHub` cap, and unknown store products granting nothing. Until the merge,
all of these are still open on `main`.

## 1. Wire the app to the learning endpoints

**Effort: L. Why:** the backend has a full catalog (`topics` > `branches` > `lessons` > `questions`) and per-event
learning routes, all tested, but the app never calls any of them. Lessons come from the app bundle, and progress
reaches the server only as the whole-profile sync (`PUT /api/me/user`). `completeRemoteLesson` and
`recordRemoteQuestionAttempt` in `src/services/backendSync.ts` have no callers. Until this is wired up, the server
can't change content without an app release, can't grade anything, and holds tables nobody reads. If you decide
not to serve lessons from the server, the honest alternative is to **delete** `routes/catalog.py`,
`routes/learning.py`, their tables and `catalog_seed.py` (effort S).

The routes involved:

| Route | File | What it does |
| --- | --- | --- |
| `GET /api/topics`, `/topics/{slug}/branches`, `/branches/{slug}/lessons`, `/lessons/{slug}`, `/lessons/{slug}/resources` | `backend/app/api/routes/catalog.py` | The catalog |
| `POST /api/lessons/{lesson_slug}/completion` | `backend/app/api/routes/learning.py` | Saves `user_progress`, pays the lesson's XP once |
| `POST /api/questions/{question_id}/attempts` | `backend/app/api/routes/learning.py` | Saves the attempt, updates `review_queue_items` |
| `GET /api/review-queue` | `backend/app/api/routes/learning.py` | The server's spaced-review queue |

### Step 0: one source of content (M, blocks everything else)

The two catalogs don't match today. The app's lessons live in `src/data/*.ts` with ids like
`lesson-foundation-niyyah` (`src/data/course.ts`). The server's catalog is **generated** by
`backend/app/catalog_seed.py`: slugs come from `slugify(title)`, and questions are placeholders built by
`build_question_specs` ("What is the main focus of '...'?"). The question route also takes the database's
integer id, which the app has never seen.

To fix it:

- Export the app's lessons to JSON with a script, the way `scripts/obsidian-import` already writes
  `backend/data/obsidian_import.json`.
- Have `catalog_seed.py` seed from that file, so `lessons.slug` equals the app's lesson id.
- Add a `questions.external_id` column (a new migration) holding the app's challenge id, and either accept it in
  the attempts route or send the database id down with the lesson.

### Step 1: report lesson completions (S once step 0 is done)

- **Where:** `continueLesson` in `src/TopicApp.tsx`, right after `completeLesson(...)` (a normal lesson) and
  `completeLessonCluster(...)` (a test-out).
- **What:** call `completeRemoteLesson({ lessonSlug: lesson.id, status: "completed", masteryScore, bestScore,
  xpEarned })`.
- **Catch:** a fire-and-forget call loses the event when the phone is offline, which is the normal case for this
  app. Completions need a persisted outbox in `backendSync.ts`, the same idea as `PENDING_SYNC_KEY`, flushed by
  `flushRemoteSync`.
- **Also:** decide who owns XP. The route adds to `users.total_xp`, but not to `daily_xp` / `xp_history_json`, which
  the weekly race and league read. The sync also sends `totalXp`, and the max-merge in `apply_frontend_state` keeps
  that from double counting, but both paths have to agree on the numbers.

### Step 2: report answers (S once step 0 is done)

- **Where:** `answerChallenge` in `src/TopicApp.tsx`, where `correct` is worked out
  (`challenge.correctChoiceId === state.selectedChoiceId`) and `recordLessonAnswer` is called.
- **What:** call `recordRemoteQuestionAttempt`, through the same outbox.
- **Consider:** one POST per answer is chatty, so a batch route (`POST /api/lessons/{slug}/attempts` taking a list)
  is kinder to the phone's battery and to the server.

### Step 3: pick one review system (S to M)

There are two spaced-review systems that don't know about each other:

- **The app's Review deck:** `user.reviewCards`, run by `src/services/reviewDeck.ts` and saved in
  `progress_extra_json`. Opened by `startReviewDeck` in `src/TopicApp.tsx` through `createReviewSession` in
  `src/api/islamicLearningApi.ts`, from `src/ui/screens/PracticeHub.tsx`.
- **The server's queue:** `review_queue_items`, served by `GET /api/review-queue`.

Either make `startReviewDeck` build its session from `GET /api/review-queue` (cached for offline use), or delete
the server queue (the `ReviewQueueItem` model and `get_review_queue`). Keeping both is the worst option.

### Step 4: serve lessons from the API (L)

- **Where:** `learningApi.getLessonSession` in `src/api/islamicLearningApi.ts` (called by `startLesson` in
  `src/TopicApp.tsx`), and the path that `src/ui/screens/LearnPath.tsx` draws from `learningApi.getPathNodes`. Both
  read the bundled `COURSE`.
- **What:** fetch `GET /api/topics` > `/topics/{slug}/branches` > `/branches/{slug}/lessons` > `/lessons/{slug}`,
  cache the results in `appStorage`, and fall back to the bundled content when offline.
- **Why it's large:** the app's lesson features (age mixes, harder levels, listening questions, pictures, test-outs)
  all work on the app's `Lesson` type in `src/types.ts`, so `LessonDetailRead` in `backend/app/schemas.py` has to
  carry the same fields first.

## 2. Grade competitive answers on the server

**Effort: M, after item 1. Why:** answers are checked on the phone (`answerChallenge` in `src/TopicApp.tsx`), the
correct answers ship in the bundle, and `GET /api/lessons/{slug}` returns `correctAnswerJson`
(`routes/catalog.py`). The server bounds the damage (5,000 XP a day in `service_layer.py`, a trophy ceiling in
`clean_ummah`), but within those bounds it believes the client:

- `POST /api/battles/{id}/score` takes the client's `correct` count (`routes/battles.py`).
- Ummah trophies arrive in the profile and are clamped, not earned on the server.

**What to do:**

- Keep grading on the phone for ordinary lessons; offline use matters more there than cheating.
- For battles and anything ranked, have the client send the chosen answers, have the server grade them against
  `questions.correct_answer_json`, and drop `correctAnswerJson` from the public lesson response.

## 3. Move the session token to SecureStore

**Effort: S. Why:** the bearer token (valid 30 days, `SIRA_SESSION_TTL_HOURS`) is saved through `appStorage`
(`src/services/appStorage.ts`, which writes to AsyncStorage) by `setSessionToken` in `src/services/backendSync.ts`.
AsyncStorage is unencrypted app storage: readable on a rooted phone and included in some device backups.

**What to do:**

- On Android and iOS, store the token with `expo-secure-store` (Keychain / Keystore). It's async, so read it once
  at start-up the way `hydrateAppStorage` does now.
- On the web, `localStorage` is readable by any XSS. Add a strict Content Security Policy, or move the web build to
  an httpOnly cookie.

## 4. Password reset and email verification

**Effort: M. Why:** there is no reset flow, so a learner who forgets their password is locked out unless they
used Google or Apple (`routes/auth.py`). Email sign-ups also never prove the learner owns the address. Today that's
handled by letting a verified Google sign-in take the account over (see `routes/auth.py` and
`core/social_tokens.py`), which is correct but surprising.

**What to do:**

- Add `POST /api/auth/password-reset` (always answers 200, rate-limited per email with `check_rate`) that emails a
  single-use, short-lived token. Store only its hash, like `auth_sessions.token_hash`.
- Add `POST /api/auth/password-reset/confirm`, which sets the new hash and deletes the user's sessions.
- Use the same token table for email verification.
- This needs an email provider (Postmark, SES, Resend) and a new settings entry in `core/config.py` and
  `.env.example`.

## 5. A real KDF for the on-device password

**Effort: S. Why:** `src/services/localAuth.ts` keeps the phone's copy of the account as 2,000 rounds of SHA-256
(`HASH_ROUNDS`), with a salt from `Math.random`, which is not a cryptographic random source. Saves from early
versions held the plain password, and those are only upgraded at the next log-in. This copy protects only the
phone, but a fast hash is easy to brute-force once the file is copied off.

**What to do:**

- Use PBKDF2 or scrypt with at least 100k iterations, through a native crypto module (for example
  `react-native-quick-crypto`), with salts from `expo-crypto`'s `getRandomBytes`.
- Rehash on the next successful log-in, as the plain-password upgrade already does.

## 6. A real baseline migration, and Postgres in CI

**Effort: M. Why:** `backend/migrations/versions/20260412_0001_initial_schema.py` calls
`Base.metadata.create_all`, so a fresh database gets *today's* schema from the first migration, and every later
migration (including `20261119_0013_ummah_ranking_columns.py`) has to check whether its columns already exist.
`alembic downgrade` from the first revision drops everything, and the history doesn't show what the schema
looked like at each step. Separately, the tests run on SQLite (`backend/tests/conftest.py`), which accepts strings in
INTEGER columns and doesn't enforce foreign keys by default, so Postgres-only errors stay hidden.

**What to do:**

- Before the first production database exists, squash to one hand-written baseline (`op.create_table` for every
  table), and write plain `op.add_column` migrations from then on.
- Add a Postgres service to `.github/workflows/ci.yml` and run `python -m pytest backend/tests` against it as
  well, with `SIRA_DATABASE_URL` pointing at it.

## 7. Move the rate limiter to Redis

**Effort: M (S if the API stays on one process). Why:** `backend/app/core/rate_limit.py` keeps attempts in a
per-process dictionary of deques. The Dockerfile runs one Uvicorn process, so that's correct today. But with two
instances, or `--workers 2`, every limit is silently multiplied, and a restart resets them. It protects log-in
(10 per 15 minutes per email, `routes/auth.py`), family and invite codes, adding friends and analytics.

**What to do:**

- Keep the `check_rate(action, key, limit, window)` interface and swap the store: a Redis sorted set per key
  (`ZADD` / `ZREMRANGEBYSCORE` / `ZCARD` in one pipeline), or a small Postgres table.
- Add a `SIRA_REDIS_URL` setting.
- Until then, document "one process only" next to the start command in the Dockerfile.

## 8. Hosting basics

**Effort: S. Why:** see "Deployment and release" in [architecture.md](architecture.md) and [hosting.md](hosting.md).
The API is set up as a Render web service on the **free** plan (`render.yaml`), which sleeps after 15 idle minutes
and takes up to a minute to wake. The app copes (`wakeBackend`, long timeouts), but it's a poor first impression.
`render.yaml` deploys on every push (`autoDeploy: true`), and nothing in the repository makes that wait for CI.
CI (`.github/workflows/ci.yml`) never builds the Docker image or runs migrations on Postgres, so a broken image or
migration is first seen on Render. No error tracking or uptime check is configured.

**What to do:**

- Move the service to a paid plan (Starter) in `render.yaml`.
- Turn on Neon backups / point-in-time restore.
- Add error tracking (Sentry) and an uptime check on `GET /api/health`.
- In Render, set auto-deploy to wait for CI checks to pass.
- Add a CI job that builds `backend/Dockerfile` and runs `alembic upgrade head` against a Postgres service (pairs with
  item 6).
- Set `SIRA_REVENUECAT_WEBHOOK_AUTH` in Render and RevenueCat before paid plans go live (the webhook answers 503
  until it is). `SIRA_ENVIRONMENT=production` is already set by `render.yaml` and `backend/Dockerfile`.

## 9. Delete the outdated Swagger file

**Effort: S. Why:** `api/islamic-learning.swagger.yaml` is an early Swagger 2.0 sketch. It has paths like
`/users/{userID}/course-path`, `/2017-06-30/shop-items` and `/users/{userID}/rewarded-heart-ad`, none of which exist.
Anyone reading it, an interviewer included, gets the wrong picture. FastAPI already generates the real contract at
`/docs` and `/openapi.json`. Delete the file, or replace it with a generated `openapi.json` checked in by a script
and compared in CI.

## 10. Smaller clean-ups

- **N+1 queries (S):** `GET /api/friends` and `GET /api/battles` load each friend / battle's user lazily
  (`routes/friends.py`, `routes/battles.py`). Use `selectinload` and one query for the mutual set.
- **An old fallback (S):** `entitlement_for_plan` in `backend/app/core/subscriptions.py` still treats an unknown
  *plan id* as Premium, for older plan ids. Store products are now checked, so that path can only be reached
  through the development-only client sync, but it should fail closed too once any old ids are migrated.
- **Password library (S):** passlib (`backend/app/core/security.py`) hasn't had a release since 2020. Move to
  `pwdlib` with Argon2, and rehash at log-in.
- **`src/TopicApp.tsx` is about 5,400 lines (L):** it holds most screens' state and the lesson flow. Split it into
  feature hooks (lesson session, shop, social) and use a navigation library. It will also make item 1 easier.
- **Rank cache (S, only at scale):** the Ummah rank of a learner is a `COUNT(*)` over everyone above them
  (`routes/ummah.py`). Fine for tens of thousands. Past that, cache the leaderboard, for example in a Redis sorted
  set alongside item 7.
