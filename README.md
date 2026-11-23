<div align="center">

<h1>Skill Tracker</h1>

<p>
  <a href="https://skill-tracker-henna.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/mntandrei/skill-tracker/actions/workflows/ci.yml"><img src="https://github.com/mntandrei/skill-tracker/actions/workflows/ci.yml/badge.svg?branch=skill-traker" alt="GitHub Actions CI"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
</p>

</div>

Personal application to track your progress in learning new skills using Next.js. You can create skills, split them into subskills and track your progress using an interactive skill tree.

---

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#technologiesused">TechnologiesUsed</a> ·
  <a href="#how-to-run-locally">How to run locally</a> ·
  <a href="#how-to-use">How to use</a> ·
  <a href="#project-structure">Project structure</a> ·
  <a href="#storage--limitations">Storage & Limitations</a>
</p>

---

## Features

- **Create/edit/delete up to 10 skills.** Each skill has a custom name, description and icon, which can be searched for.
- **Create parent-child relationships between subskills,** and delete subskills and their children.
- **Interact with your interactive skill tree.** Move nodes to your preferred location, and zoom between 50-200%.
- **Tick off subskills,** and track your progress percentage on the dashboard.
- **View up to three recommended subskills you haven’t learned yet.**
- **Create a study streak by incrementing once every 24 hours.** If you tick a subskill whilst on cooldown, your streak will still be protected, however it will expire after 48 hours of no learning activities.
- **Toggle between light/dark themes.**

---

## TechnologiesUsed

| | |
| :--- | :--- |
| <img src="https://cdn.simpleicons.org/nextdotjs/white" width="20" alt="Next.js"> | Next.js 16 (App Router) |
| <img src="https://cdn.simpleicons.org/react/149ECA" width="20" alt="React"> | React 19 and Typescript |
| <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="20" alt="Tailwind CSS"> | Tailwind CSS 4 |
| <img src="https://cdn.simpleicons.org/lucide" width="20" alt="Lucide"> | Lucide React and React Icons |
| <img src="https://img.shields.io/badge/%20-Storage-6B7280?style=flat-square" alt="Storage"> | Local storage |

---

## How to run locally

Install node.js and npm. Then run:

```bash
npm ci
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

You can also run:

```bash
npm run lint
npm run build
```

---

## How to use

1. Navigate to Skills and create a skill e.g. JavaScript.
2. Click on the skill you want to view the tree for and add your first subskill.
3. Click on any subskill to edit it, tick it off, or create a child subskill.
4. Navigate to Dashboard to view your progress, recommended subskills and study streak.
5. Drag nodes around to personalise your skill tree. Node positions and zoom preferences will be saved locally.

---

## Project structure

The skills page is located at `src/app/components/skills/` which contains functions to create/edit skills, dialogues and interactive skill tree.

The dashboard page is located at `src/app/components/dashboard/` which contains functions to select skills, get recommended subskills, track progress and study streak.

Local storage helper functions and study streak rules can be found at `src/app/components/lib/`.

TypeScript types for skills and subskills can be found at `src/app/components/types/`.

Theme toggle can be found at `src/app/components/ui/`.

---

## Storage & Limitations

All skills, subskills, node positions and study streaks will be saved to your browser. There isn’t a backend or account login, so there isn’t a way to sync between devices. If you’re using multiple tabs within the same browser profile, refreshing the tabs will update based on the stored data. However if you clear your browsers storage, or use a different browser/device your data won’t be saved.

This project was created as a personal learning exercise, and portfolio piece.

---

## Author

[Andrei Muntianu](https://github.com/mntandrei)
