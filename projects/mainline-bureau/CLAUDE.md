# Mainline Bureau (主线局)

## Goal
Create a public-facing static demo for a hackathon submission.
The page must make one thing obvious fast: this is an AI digital team that turns scattered inputs into a real action chain, not a decorative chatbot demo.

## Product positioning
- Name: 主线局 / Mainline Bureau
- Core promise: keep the user on the mainline, detect fake progress, compress complexity into today's concrete action, and leave an artifact.
- Audience: judges who open a URL and decide in under 60 seconds whether the project is real, sharp, and differentiated.

## Non-negotiables
- Static site only: plain HTML/CSS/JS, no build step, no backend dependency.
- Must work when opened from GitHub Pages.
- Must feel premium, fast, and intentional on desktop first, while remaining usable on mobile.
- Must include real interactivity, not just static copy.
- Must reflect Han Wuyue's actual edge: law-study mainline, AI as tool, Obsidian compilation, anti-fake-progress judgment.

## Structure
- `index.html`: landing page for the public-facing submission.
- `styles.css`: isolated styles for the landing page only.
- `app.js`: deterministic interactive behavior and scenario engine.
- `film.html`: standalone in-browser product film / motion demo.
- `film.css`: styles for the motion demo.
- `film.js`: lightweight timeline-driven motion and scene switching.

## UX rules
- Show the idea in one screen.
- Use presets so judges can click once and see the system work.
- Every interaction should produce visible outputs in under 1 second.
- The product should output four things: mainline judgment, team dispatch, anti-self-deception warning, and artifact for Obsidian/logging.
- Default language: Chinese.

## Content rules
- No fake claims like "fully autonomous" or "AGI".
- Be concrete: roles, inputs, outputs, artifacts.
- Keep copy sharp and confident, not inflated.

## Implementation rules
- Prefer clean deterministic generation over broken pseudo-AI magic.
- No external JS/CSS dependencies.
- Keep animations lightweight.
- If adding new files in this folder later, update this document first.
