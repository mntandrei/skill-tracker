import NavBar from "../components/mainpage/NavBar";

export default function About() {
    return (
        <main>
            <NavBar />
            <div className="flex flex-col max-w-4xl mx-auto min-h-[500px] mt-5 p-5 shadow-lg rounded-3xl bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">About</h2>
            </div>
        </main>
    );
}