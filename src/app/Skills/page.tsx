import CreateSkillModal from "../components/skills/CreateSkillModal";

export default function Skills() {
    return (
        <main>
            <div className="flex flex-col max-w-4xl mx-auto min-h-[500px] mt-5 p-5 shadow-lg rounded-3xl bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <CreateSkillModal />
            </div>
        </main>
    );
}