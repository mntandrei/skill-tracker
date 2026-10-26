
import type { SubSkill } from "@/app/components/types/subskill";
import { skillIcons } from "./IconPicker";

type SubSkillNodeProps = {
  subSkill: SubSkill;
  subSkills: SubSkill[];
  onSelect: (id: string) => void;
};

export default function SubSkillNode({
  subSkill,
  subSkills,
  onSelect,
}: SubSkillNodeProps) {
  const children = subSkills.filter(
    (item) => item.parentSubSkillId === subSkill.id
  );

  const selectedIcon = skillIcons.find(
    (icon) => icon.id === subSkill.icon
  );

  const Icon = selectedIcon?.Icon;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onSelect(subSkill.id)}
        className={`flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-2 p-2 text-center ${
          subSkill.studied
            ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
            : "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400"
        }`}
      >
        {Icon && (
          <Icon
            size={21}
            strokeWidth={1.8}
            className="shrink-0"
          />
        )}

        <span className="line-clamp-2 max-w-full break-words text-xs font-medium">
          {subSkill.name}
        </span>
      </button>

      {children.length > 0 && (
        <>
          <div className="h-7 w-px bg-zinc-300 dark:bg-zinc-600" />

          <div className="flex flex-wrap items-start justify-center gap-6">
            {children.map((child) => (
              <SubSkillNode
                key={child.id}
                subSkill={child}
                subSkills={subSkills}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
