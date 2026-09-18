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

React + Vite, Tailwind CSS, Framer Motion, React Router. All state lives in React context (`src/state/VillageContext.jsx`) — no backend, no real calls, everything simulated for the demo.

## Running locally

```bash
npm install
npm run dev
```

Best viewed at a 375–430px mobile viewport, though it's readable on desktop too.
