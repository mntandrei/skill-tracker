# Skill Tracker

A personal learning-progress tracker built with Next.js. Create skills, break them into connected subskills, and follow your progress in an interactive skill tree.

## Features

- Create, edit, and delete up to **10 skills**, with custom names, descriptions, and searchable icons.
- Organize subskills into **parent–child relationships**. Delete a subskill together with its descendants.
- Explore an interactive **skill tree**, drag nodes to custom positions, and zoom from 50% to 200%.
- Mark subskills as learned and follow the completion percentage for each skill on the dashboard.
- See up to three not-yet-learned subskills suggested on the dashboard.
- Build consistency with a **study streak**: one increment after a 24-hour cooldown. Marking a subskill as learned during cooldown still protects the streak, which expires after 48 hours without learning activity.
- Switch between light and dark themes.

## Tech stack

- **Next.js 16** (App Router)
- **React 19** and **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** and **React Icons**
- **Browser localStorage** for persistence

## Run locally

Install Node.js and npm, then run:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run build
```

## Using the app

1. Open **Skills** and create a skill (for example, JavaScript).
2. Select that skill to open its tree and add your first subskill.
3. Open any subskill to edit it, mark it as learned, or create a child subskill.
4. Use **Dashboard** to see progress, recommended subskills, and your study streak.
5. Drag nodes to customize your tree. Their positions and your preferred zoom are saved locally.

## Project structure

- `src/app/components/skills/` — skill creation/editing, dialogs, and interactive tree
- `src/app/components/dashboard/` — skill selection, recommendations, progress, and streak
- `src/app/components/lib/` — localStorage helpers and streak rules
- `src/app/components/types/` — TypeScript types for skills and subskills
- `src/app/components/ui/` — theme toggle

## Storage and limitations

All skills, subskills, node positions, and streak data are saved **in your browser**. There is no backend, account login, or cross-device synchronization. Tabs in the same browser profile can refresh their views when stored data changes, but clearing browser storage or using another browser/device will not preserve your data.

This project is designed as a personal learning exercise and portfolio project.

## Author

[Andrei Muntianu](https://github.com/mntandrei)
