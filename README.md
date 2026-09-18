# Aangan (आँगन)

A high-fidelity interactive prototype of Aangan — a warm, illustrated digital village that keeps Indian families close across distance. Built for a MAANG-level UX portfolio case study.

## Concept

Aangan is a shared imaginary village where your family is always nearby. Each family member has a house arranged around yours by emotional proximity. The village is always alive — it has a day cycle and gardens that bloom or wilt based on how long it's been since you last connected. Visiting someone's house means calling them.

## Flows in this prototype

- **`/` — Village Home**: the shared hub. Isometric-feel map with the mandir, family houses (each with a living garden), the chowk, and a day-of-day sky.
- **`/morning` — The Morning Ritual**: today's deity greeting, an AI-blessed devotional image, and sharing a blessing with the whole village (diyas light up on every house).
- **`/knock` — The Knock**: visit a family member whose garden has faded, knock on their door, wait, sit together in an ambient voice call, and watch their garden bloom again after you connect.
- **`/chai` — Chai Bulaana**: put the kettle on for the whole village, watch family drop by the chowk, and sit in ambient company with no agenda.

## Stack

React + Vite, Tailwind CSS, Framer Motion, React Router. All state lives in React context (`app/src/state/VillageContext.jsx`) — no backend, no real calls, everything simulated for the demo.

## Repo layout

The Vite project lives in `app/`. The repo **root** holds the production build (`index.html`, `404.html`, `assets/`) because GitHub Pages for this repo is configured to deploy straight from this branch's root — there's no separate build step on GitHub's side, so the built files have to already be committed there.

```
app/        Vite source — edit here
index.html  built output, served by GitHub Pages
assets/     built output, served by GitHub Pages
404.html    copy of index.html, so client-side routes survive a hard refresh
```

## Running locally

```bash
cd app
npm install
npm run dev
```

Vite is configured with `base: '/aangan/'` to match the GitHub Pages path, so the dev server serves the app at `http://localhost:5173/aangan/` (not the bare root).

Best viewed at a 375–430px mobile viewport, though it's readable on desktop too.

## Deploying

Whenever `app/src` changes, rebuild and refresh the root copy, then commit both:

```bash
./deploy.sh
git add -A
git commit -m "Rebuild for Pages"
git push
```

Live at <https://ashitataneja.github.io/aangan/>.
