"use client";

import { useState } from "react";
import {
  Code2,
  Braces,
  FileCode2,
  Terminal,
  GitBranch,
  GitPullRequest,
  Bug,
  Database,
  Server,
  Cloud,
  Globe,
  Laptop,
  Smartphone,
  AppWindow,
  Monitor,
  Cpu,
  CircuitBoard,
  Network,
  ShieldCheck,
  LockKeyhole,
  Bot,
  Brain,
  BookOpen,
  GraduationCap,
  PenTool,
  Palette,
  Paintbrush,
  Camera,
  Video,
  Music,
  Mic,
  Headphones,
  Gamepad2,
  Joystick,
  Dumbbell,
  Bike,
  Footprints,
  HeartPulse,
  CookingPot,
  ChefHat,
  Languages,
  Calculator,
  ChartNoAxesCombined,
  Presentation,
  BriefcaseBusiness,
  Target,
  Rocket,
  Leaf,
  type LucideIcon,
} from "lucide-react";

const categories = [
  "Programming",
  "Technology",
  "Cybersecurity",
  "Education",
  "Design",
  "Media",
  "Gaming",
  "Sports",
  "Health",
  "Cooking",
  "Business",
  "Nature",
] as const;

type IconCategory = (typeof categories)[number];

export const skillIcons = [
  { id: "code", category: "Programming", Icon: Code2 },
  { id: "braces", category: "Programming", Icon: Braces },
  { id: "file-code", category: "Programming", Icon: FileCode2 },
  { id: "terminal", category: "Programming", Icon: Terminal },
  { id: "git-branch", category: "Programming", Icon: GitBranch },
  { id: "git-pull-request", category: "Programming", Icon: GitPullRequest },
  { id: "bug", category: "Programming", Icon: Bug },

  { id: "database", category: "Technology", Icon: Database },
  { id: "server", category: "Technology", Icon: Server },
  { id: "cloud", category: "Technology", Icon: Cloud },
  { id: "globe", category: "Technology", Icon: Globe },
  { id: "laptop", category: "Technology", Icon: Laptop },
  { id: "smartphone", category: "Technology", Icon: Smartphone },
  { id: "app-window", category: "Technology", Icon: AppWindow },
  { id: "monitor", category: "Technology", Icon: Monitor },
  { id: "cpu", category: "Technology", Icon: Cpu },
  { id: "circuit-board", category: "Technology", Icon: CircuitBoard },
  { id: "network", category: "Technology", Icon: Network },
  { id: "bot", category: "Technology", Icon: Bot },

  { id: "shield", category: "Cybersecurity", Icon: ShieldCheck },
  { id: "lock", category: "Cybersecurity", Icon: LockKeyhole },

  { id: "brain", category: "Education", Icon: Brain },
  { id: "book", category: "Education", Icon: BookOpen },
  { id: "graduation", category: "Education", Icon: GraduationCap },
  { id: "languages", category: "Education", Icon: Languages },
  { id: "calculator", category: "Education", Icon: Calculator },

  { id: "pen-tool", category: "Design", Icon: PenTool },
  { id: "palette", category: "Design", Icon: Palette },
  { id: "paintbrush", category: "Design", Icon: Paintbrush },

  { id: "camera", category: "Media", Icon: Camera },
  { id: "video", category: "Media", Icon: Video },
  { id: "music", category: "Media", Icon: Music },
  { id: "mic", category: "Media", Icon: Mic },
  { id: "headphones", category: "Media", Icon: Headphones },

  { id: "gamepad", category: "Gaming", Icon: Gamepad2 },
  { id: "joystick", category: "Gaming", Icon: Joystick },

  { id: "dumbbell", category: "Sports", Icon: Dumbbell },
  { id: "bike", category: "Sports", Icon: Bike },
  { id: "footprints", category: "Sports", Icon: Footprints },

  { id: "heart-pulse", category: "Health", Icon: HeartPulse },

  { id: "cooking-pot", category: "Cooking", Icon: CookingPot },
  { id: "chef-hat", category: "Cooking", Icon: ChefHat },

  { id: "chart", category: "Business", Icon: ChartNoAxesCombined },
  { id: "presentation", category: "Business", Icon: Presentation },
  { id: "briefcase", category: "Business", Icon: BriefcaseBusiness },
  { id: "target", category: "Business", Icon: Target },
  { id: "rocket", category: "Business", Icon: Rocket },

  { id: "leaf", category: "Nature", Icon: Leaf },
] as const satisfies readonly {
  id: string;
  category: IconCategory;
  Icon: LucideIcon;
}[];

export type SkillIconName = (typeof skillIcons)[number]["id"];
type IconPickerProps = {
  selectedIcon: SkillIconName | null;
  onSelect: (icon: SkillIconName) => void;
};

export default function IconPicker({
  selectedIcon,
  onSelect,
}: IconPickerProps) {
  const [category, setCategory] =
    useState<IconCategory>("Programming");

  const [search, setSearch] = useState("");

  const filteredIcons = skillIcons.filter(
    ({ id, category: iconCategory }) =>
      iconCategory === category &&
      id.includes(search.trim().toLowerCase()),
  );

  return (
    <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
      <label
        htmlFor="icon-category"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Category
      </label>
      <select
        id="icon-category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value as IconCategory);
          setSearch("");
        }}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
        {categories.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search icons..."
        aria-label="Search icons"
        className="mt-3 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"/>
      <div
        role="group"
        aria-label="Choose a skill icon"
        className="mt-3 grid max-h-44 grid-cols-5 gap-2 overflow-y-auto p-1 sm:grid-cols-6">
        {filteredIcons.map(({ id, Icon }) => (
          <button
            key={id}
            type="button"
            title={id}
            aria-label={`Choose ${id} icon`}
            aria-pressed={selectedIcon === id}
            onClick={() => onSelect(id)}
            className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-red-500 ${
              selectedIcon === id
                ? "border-red-600 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-950/30 dark:text-red-700"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-red-300 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-red-700 dark:hover:bg-zinc-700 dark:hover:text-red-700"
            }`}>
            <Icon size={21} strokeWidth={1.8} />
          </button>
        ))}
      </div>
      {filteredIcons.length === 0 && (
        <p className="py-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
          No icons found
        </p>
      )}
    </div>
  );
}
