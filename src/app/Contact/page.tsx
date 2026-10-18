import NavBar from "../components/NavBar";


export default function Contact() {
    return (
        <main>
            <NavBar />
            <div className="flex flex-col max-w-3xl mx-auto min-h-[500px] mt-5 p-5 shadow-lg rounded-lg bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
            </div>
        </main>
    );
}