import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/mainpage/NavBar";

export const metadata: Metadata = {
  title: "Skill Tracker",
  description: "Track your skills and learning progress.",
  icons: {
    icon: "/icon.svg",
  }
};

const version = "v0.0.6";
const release = "ALPHA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <NavBar />
        {children}
        <div className="fixed right-5 bottom-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-yellow-600" />
          <span className="text-xs font-medium text-gray-600">
            Skill Tracker <span className="text-red-700">{version}</span>
          </span>
          <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-[10px] font-semibold text-yellow-700">
            {release}
          </span>
        </div>
      </body>
    </html>
  );
}
