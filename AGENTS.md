# Manu Portfolio

Personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. It is a single, self-contained app — no database, no external services. Blog content comes from local Markdown in `content/blog/`, and structured data from `data/*.json`.

## Cursor Cloud specific instructions

Standard commands are in `README.md` and `package.json` scripts. Notes below cover only non-obvious caveats.

### Running / services
- Single service: the Next.js app. Start dev with `npm run dev` (Turbopack) — serves on `http://localhost:3000`. There is no separate backend, DB, or worker to start.
- Lint with `npm run lint`, production build with `npm run build` (these mirror the CI in `.github/workflows/ci.yml`).
- No environment variables are required; `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_LINKEDIN_URL` are optional and have sensible fallbacks.

### Node version
- `.nvmrc` pins Node 20 and CI uses Node 20, but `package.json` engines is `>=20`. The VM's default `node` (v22, resolved from a `/exec-daemon` shim that takes PATH precedence over nvm) satisfies this and builds/runs fine. No need to fight the PATH to force Node 20.

### Contact API gotcha
- `app/api/contact/route.ts` reads the body with `req.formData()`, so it only accepts `multipart/form-data` or `application/x-www-form-urlencoded`. Posting JSON returns HTTP 500 (`Content-Type was not one of ...`). This is expected — the in-app `ContactForm` submits form-encoded data. To test via curl use `-F` flags, e.g. `curl -X POST http://localhost:3000/api/contact -F name=... -F email=... -F message=...`.
- The route does not send email; it only `console.log`s the submission (see the `TODO`). A successful submit logs `Contact form: {...}` in the dev server output and returns `{"ok":true}`.
