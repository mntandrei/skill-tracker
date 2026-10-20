export default function SelectTab() {
  const selectskill = ["JavaScript"];
  const recommendedSkills = ["React", "Next.js", "Angular"];

  return (
    <div className="min-h-52 rounded-xl border border-gray-200 border-l-4 border-l-red-400 bg-white p-5 shadow-sm ">
      <h2 className="text-xl font-semibold">Select Skill</h2>
      <select className="mt-3 w-full rounded border border-gray-300 p-2">
        <option value="">Select a skill</option>
        {selectskill.map((skill) => (
          <option key={skill} value={skill.toLowerCase()}>
            {skill}
          </option>
        ))}
      </select>
      <div>
        <p className="mt-3 text-gray-500">Recommended skill</p>
        <ul className="mt-2 list-disc list-inside text-gray-500">
          {recommendedSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}
