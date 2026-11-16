# Muslimo: interview questions and answers

Questions an interviewer is likely to ask about this project, with short answers grounded in the code. Read
[architecture.md](architecture.md) first; the answers point back to files so you can open them if asked to show.
[ROADMAP.md](ROADMAP.md) lists what's still missing before launch, with effort estimates.
Answers are written in the first person so you can practise saying them; put them in your own words.

Several fixes mentioned below came from a code review and are on the `claude/muslimo-fixes-v2` branch (exported as
`patches-v2`), not yet on `main` (664f7c8): removing the old `backend/server.js` (its social login accepted any
token), the lesson-completion XP hole, the sync validation, the catalog `GROUP BY`, the fail-closed subscription
sync, the Ummah ranking in SQL, the request-body limit, the `socialHub` cap, and unknown store products granting
nothing. Until they're merged, those holes are still on `main`. Once merged, say they were found in review, and make
sure you can explain each fix without notes.

## The 60-second version

> Muslimo is a Duolingo-style app for learning Islam: a path of short lessons with XP, streaks, hearts, leagues,
> friend battles and a parent view. It's one TypeScript codebase in Expo / React Native for Android, iOS and web,
> plus a FastAPI backend on SQLAlchemy and Postgres. The key design decision is that it's **offline first**: lessons
> ship in the app and progress is saved on the phone, and the server is for accounts, cloud backup, the social
> features and purchases. The interesting backend problem is sync: two phones can send out-of-date copies of the
> same profile, so the server merges them with per-field rules instead of last-write-wins. It has about 150 pytest
> tests and 170 Jest test files, and CI on every pull request. The API is configured to deploy to Render with Neon
> Postgres, and iOS 1.0.0 has been through App Review once: it was rejected for two issues, which I've fixed.

Numbers worth knowing: 44 API routes, 18 tables, 12 Alembic migrations, a 4-second sync debounce, a 5,000 XP-per-day
cap, sessions that last 30 days.

## Questions

### 1. Walk me through what happens when a user taps a lesson.

No network call at first. `LearnPath.tsx` calls `startLesson` in `src/TopicApp.tsx`, which checks premium, lock
state and hearts, then builds the session on the device from bundled content (`getLessonSession` in
`src/api/islamicLearningApi.ts`). Answers are graded on the device, and each one produces a new immutable profile
in a `useReducer`. A `useEffect` saves every new profile to AsyncStorage and queues a sync. After 4 quiet seconds
`backendSync.ts` sends the whole profile to `PUT /api/me/user` with a bearer token. The server looks up the session
by the token's SHA-256, loads the `users` row, merges the snapshot (`apply_frontend_state` in
`backend/app/service_layer.py`), runs one UPDATE and returns the merged profile.

### 2. Why offline first instead of fetching lessons from the API?

The audience includes kids and learners in places with patchy data, and I wanted the app to work on a plane or
with the server down. It also made the free hosting tier usable: it sleeps after 15 idle minutes and takes up to a
minute to wake, and nobody notices because learning never waits on it. The cost is that content changes need an app
release and answers are graded on the client. The catalog tables and routes are already there
(`backend/app/api/routes/catalog.py`) for moving lessons to the server later.

### 3. Two phones edit the same profile offline. How do you resolve conflicts?

Per-field merge rules instead of last-write-wins (`apply_frontend_state`). Things that only grow are merged so
nothing is lost: finished lessons are a set union, stars and XP take the max, and an older streak date or league week
never replaces a newer one. Things that get spent, like gems and hearts, take the latest copy, because "max wins"
would let you spend gems and get them back. It's similar in spirit to CRDTs (grow-only sets, max registers) without
the machinery. On the client, a phone with unsent changes keeps its own copy at startup (`pickStartingUser`) so
offline progress isn't overwritten by an older server copy.

### 4. Why one wide `users` row with JSON columns instead of normalized tables?

The app's unit of state is one `UserProfile` object that changes on every answer and is synced whole. One row means
one indexed read and one UPDATE per sync, and new app fields go into `progress_extra_json` without a migration
(capped at 40 keys and 256 KB). I use real columns where the server enforces rules or other routes read the value:
`total_xp`, `streak_days`, `hearts_*`, `gems`. The trade-off is that JSON can't be indexed portably across SQLite and
Postgres, so anything queried across learners needs its own column. The Ummah ranking is the example: `User` copies
trophies and "joined" out of `ummah_json` into `ummah_trophies` / `ummah_ranked` on every assignment (a `@validates`
hook in `models.py`), and the ranking sorts and counts on an index (question 13).

### 5. How does authentication work? Why not JWTs?

Email and password are hashed with PBKDF2-SHA256 through passlib (`backend/app/core/security.py`). Login returns a
random 48-byte token; the server stores only its SHA-256 in `auth_sessions`, so a database leak can't be replayed.
I chose opaque tokens over JWTs because I need revocation: logout deletes one row, deleting an account cascades, and
a Google takeover of an unverified sign-up deletes all of that user's sessions. With JWTs I'd need a denylist anyway.
The cost is a database lookup per request, which is one indexed query.

### 6. How do Google and Apple sign-in work?

The app gets an ID token from the provider and posts it to `POST /api/auth/social`. `core/social_tokens.py` fetches
the provider's public keys (JWKS, cached for an hour and refetched on an unknown key id), accepts only RS256/384/512
so a token can't pick `none` or HS256, and checks `aud` against our client ids, `iss`, `exp` and a verified email.
One subtle rule: email sign-ups never prove email ownership, so if someone signed up with your email and a password,
your later Google sign-in takes the account over, clears the password and signs out every session.

### 7. How do you stop people cheating on XP and the leaderboards?

The server distrusts the client's numbers: XP per day is capped at 5,000, total XP can grow by at most that cap per day
since the last save (`max_total_xp`), unlimited hearts never come from the app, and values that don't fit their
columns are refused. Honestly, though, answers are graded on the device, so a determined user can still earn up to the
cap. For real competition I'd move grading to the server. A review also found a hole: `POST
/api/lessons/{slug}/completion` added XP on every call with no bound, so a loop could post any total. It now pays at
most the lesson's reward, once.

### 8. How do payments work, and how do you stop someone granting themselves premium?

Purchases go through RevenueCat. RevenueCat calls `POST /api/subscriptions/revenuecat/webhook` with a shared secret
that I check with `hmac.compare_digest` (constant time). The webhook maps store products to plans and updates
`subscription_entitlements`. A cancelled plan keeps access until the paid period ends. There's also a client sync
route for local testing, and it only works when `SIRA_ENVIRONMENT` is `development` or `test`: any other value is
refused, so a typo in production can't open it.

### 9. Kids use this app. How do you handle privacy?

A learner's name, XP and streak are shown only to people they added back; adding someone by email reveals nothing
until they agree (`routes/friends.py`). The public ranking shows a generated nickname, one adjective, one animal and a
number, never typed, so no real name can leak (`clean_ummah`). A parent links to a child only with a 6-character code
the child's phone shows behind a grown-up gate, valid for 24 hours, once. Account deletion is in the app and deletes
the row and everything that cascades from it.

### 10. How do you test it, and what do your tests not catch?

The API has pytest tests that use FastAPI's `TestClient` against a throwaway SQLite file (`backend/tests/conftest.py`
sets `SIRA_DATABASE_URL` before the app imports its settings). The app has Jest tests for XP, streaks, hearts, the
lesson flow and screens. CI (`.github/workflows/ci.yml`) runs on every pull request and push to `main`: `tsc`,
Jest, the notes-importer tests, an Android and iOS bundle, a release-config check, the web build opened in headless
Chromium, and pytest on Python 3.12. The gap is that SQLite is permissive: it stores a string in an INTEGER column and doesn't enforce foreign
keys by default, so a class of Postgres-only 500s was invisible to the tests. I added validation for those, and the
next step is running the suite against Postgres in CI.

### 11. How is it deployed?

The API is a Docker image (`backend/Dockerfile`) on a Render web service defined in `render.yaml`: free plan,
health check on `/api/health`, and it redeploys on every push. The database isn't on Render, because Render's free
Postgres is deleted after 30 days; it's a free Neon Postgres, and the connection string and other secrets are typed
into the Render dashboard (`sync: false`), never committed. Each container start runs `alembic upgrade head` and an
idempotent catalog seed, then Uvicorn. The apps are built with Expo EAS (`eas.json`): a development client, a
preview APK for testers and production builds with auto-incremented build numbers, submitted to Play's internal track
as drafts. `EXPO_PUBLIC_API_BASE_URL` is set per EAS environment, and a release build without it stays offline-only
instead of calling localhost. What I'd add: a paid plan so it doesn't sleep, backups, error tracking and uptime
alerts, and making Render wait for green CI.

### 12. Is it live? Does it have users?

Say only what you can show. The repository shows: iOS 1.0.0 went through App Review and was rejected for two
reasons, both fixed on `main` (Apple's own Sign in with Apple button, `src/ui/screens/AppleSignInButton.native.tsx`;
no personalised-ads consent form on iPhone, `src/services/monetization.native.ts`). `site/app-version.json` shows
Android build 14 live on a Play track and iOS not yet on the App Store. Whether the resubmission is approved, which Play track
the builds are on, and any user numbers are in App Store Connect, Play Console and the stats page, not the code. Check
them the day before and say exactly that. The rejection is a good story: what Apple flagged, why, and the fix.

### 13. What breaks first at 100,000 users?

The rate limiter keeps counts in process memory, which is right for one process but wrong once there are several
instances, so it would move to Redis. `GET /api/friends` runs a few queries per friend, which needs eager loading.
And the Ummah rank is a `COUNT(*)` of everyone above the learner: fine at this size, but at very large sizes I'd cache
the leaderboard (a Redis sorted set). Two of these used to be worse and are fixed: the topic list had an N+1 and now
uses two `GROUP BY` queries, and the Ummah ranking used to load every user row and sort in Python. It now runs
`ORDER BY ummah_trophies DESC, id LIMIT 50` plus two `COUNT`s on an index (`routes/ummah.py`, migration
`20261119_0013`).

### 14. Why rate-limit per email and per account instead of per IP?

Behind Render's proxy, and on mobile carrier NAT, many phones share an address, so a per-IP limit could lock out a
whole classroom. Login is limited per email (10 per 15 minutes) to slow password guessing on one account;
code entry is limited per account so nobody can enumerate 6-character family codes (`core/rate_limit.py`). It's a
sliding window of timestamps in a deque per key, with a periodic sweep so memory stays bounded.

### 15. How do database migrations work?

Alembic, with a revision per schema change (`backend/migrations/versions`). One weakness I'd own: the first
migration calls `Base.metadata.create_all` on the current models, so later migrations have to check whether a column
already exists before adding it. That works, but the history isn't a true record, and downgrades aren't reliable.
Now that the schema is settling I'd squash to one real baseline migration and write plain `op.add_column` migrations
from there.

### 16. Tell me about a bug you found.

A good one is the profile sync. The sync route copied values like `gems` or `preferredLanguage` straight from the
app's JSON into typed columns. On SQLite, which the tests use, anything goes. On Postgres, a string in an INTEGER
column or a 17-character language code fails the whole save with a 500. Worse, if `reminderPreferences` arrived as
a list, it *saved*, and then every `/api/session` for that account failed response validation, so the user was stuck.
The fix was small validators (`clean_int`, `clean_bool`, `clean_text`, `clean_dict` in `service_layer.py`) that keep
the saved value when a new one is invalid, plus tests.

### 17. What would you do differently?

Split `src/TopicApp.tsx`, which is about 5,400 lines holding most screens' state, into feature hooks and a navigation
library. Decide earlier whether the server or the client owns lessons, instead of building both. Run tests on Postgres
from day one. Use a maintained password library (passlib's last release was in 2020; `pwdlib` with Argon2 is a
modern choice).

### 18. How much of this did you write yourself? Did you use AI tools?

Answer this one honestly; interviewers ask it often now, and a confident, specific answer beats a vague one. A good
shape: say which tools you used and for what, then show ownership by explaining a design decision and a bug in
detail (questions 3 and 16 work well). What interviewers want to know is whether you understand and can defend the
code, and whether you can work in it without the tool.

## Weak spots an interviewer might poke at

| They might say | What's true | An honest way to talk about it |
| --- | --- | --- |
| "Your answers are checked on the client, and `GET /api/lessons/{slug}` returns `correctAnswerJson`." | Yes. Lessons and answers ship in the bundle too. | "For a learning app that's a deliberate trade-off for offline use. Anything competitive (battles, rankings) should be graded on the server; that's my next step." |
| "You have catalog, completion, attempt and review-queue routes the app never calls." | True: `completeRemoteLesson` and `recordRemoteQuestionAttempt` in `backendSync.ts` have no callers, and the app's Review deck is a separate on-device system. | "I built the normalized model ahead of moving lessons to the server. If I weren't going to do that I'd delete it; unused code is a liability." The concrete wiring plan (which screen calls which route, and why the two catalogs must first share ids) is item 1 of [ROADMAP.md](ROADMAP.md). |
| "Your first migration is `create_all`." | Yes (`20260412_0001_initial_schema.py`). | Question 15. |
| "Your tests run on SQLite but production is Postgres." | Yes. | Question 10: name the class of bugs it hid and the fix. |
| "Where is the session token stored on the phone?" | AsyncStorage (`localStorage` on the web), not the Keychain/Keystore. | "On native I'd move it to `expo-secure-store`. On web, any XSS could read it; the mitigation is a strict CSP or an httpOnly cookie for the web build." |
| "How is the on-device account password stored?" | `src/services/localAuth.ts`: 2,000 rounds of SHA-256 with a `Math.random` salt; saves from early versions kept the raw password. | "It only protects the copy on the phone itself, but I'd use a real KDF and a crypto-random salt, and rehash old saves at next login." |
| "Is there a password reset?" | No reset or email verification flow exists. | "Google and Apple sign-in cover most users, and a verified social sign-in reclaims a squatted email. Reset by emailed one-time link is the missing piece before launch." |
| "What stops a 100 MB request body?" | Fixed in review: an ASGI middleware (`core/body_limit.py`) refuses bodies over `SIRA_MAX_REQUEST_BODY_BYTES` (1 MiB) with 413, counting chunked bodies too, and `socialHub` is limited to its two lists, 200 items each, 64 KB. | "It used to be nothing. Now there's a size limit before any route parses JSON, plus per-field caps where data is stored." |
| "Streaks use the phone's date." | Yes: `lastStreakDate` and `xpByDay` keys are the device's local dates. | "That's deliberate, so the day ends at the learner's midnight. Changing the phone's clock can game a streak; the XP caps bound the damage." |
| "An unknown store product becomes premium." | Fixed in review: `plan_for_store_product` returns `None` for an unknown product, and the webhook grants nothing, logs a warning and records a `revenuecat.unknown_product` event. | "It used to fail open. For money, failing closed and alerting is right: a missed grant is a support ticket, a wrong grant is lost revenue that nobody notices." |
| "Your server sleeps." | Yes: Render's free plan (`render.yaml`) sleeps after 15 idle minutes and takes up to a minute to wake. | "The app is offline first, pings `/api/health` on open and waits up to 60 s for log-in, so learners don't notice much. Before real traffic it goes on the paid plan." |
| "Does a red CI build still deploy?" | `render.yaml` says `autoDeploy: true`; waiting for CI is a Render service setting the repo can't show. | "It should wait for checks; I'd turn on 'After CI checks pass' and add a Postgres job and a Docker build to CI." |
| "Your app was rejected by Apple." | Yes, iOS 1.0.0, under guidelines 4 and 5.1.2(i); both fixed on `main`. | Question 12: say what was flagged and how you fixed it. |
| "`api/islamic-learning.swagger.yaml` doesn't match your API." | It's an early design sketch. | "FastAPI's `/docs` and `/openapi.json` are generated from the code and are the real contract; I should delete the old file." |
| "`TopicApp.tsx` is 5,400 lines." | Yes. | Question 17. |

## Practise out loud

Without notes, explain:

1. Why `gems` take the latest copy but `totalXp` takes the max.
2. What the server stores instead of the session token, and why.
3. The two SQL queries `GET /api/topics` runs, and why that beats one query per topic.
4. What happens, step by step, if the phone is offline when a lesson finishes, and when the progress reaches the
   server.
5. How the Ummah ranking finds a learner's rank without loading every user, and why trophies are copied into a
   column instead of queried inside the JSON.
6. What `render.yaml`, `eas.json` and `.github/workflows/ci.yml` each do, and what happens between merging a pull
   request and a learner getting the new version (API: Render redeploys; app: an EAS build, then store review).
