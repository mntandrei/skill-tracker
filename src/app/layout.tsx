import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/layout/NavBar";

export const metadata: Metadata = {
  title: "Skill Tracker",
  description: "Track your skills and learning progress.",
  icons: {
    icon: "/icon.svg",
  },
};

const version = "v1.1.1";
const release = "RELEASED";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{__html: `
              try {
                const savedTheme = localStorage.getItem("theme");

                if (savedTheme === "dark" || savedTheme === "light") {
                  document.documentElement.classList.toggle("dark", savedTheme === "dark");
                  document.cookie = "theme=" + savedTheme + "; path=/; max-age=31536000; SameSite=Lax";
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-zinc-50 pb-20 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-white sm:pb-0">
        <NavBar />
        {children}
        <div className="fixed right-3 bottom-3 z-20 flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90 sm:right-5 sm:bottom-5 sm:px-4">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          <span className="text-xs font-medium text-gray-600 dark:text-zinc-300">
            Skill Tracker{" "}
            <span className="text-red-700">
              {version}
            </span>
          </span>
          <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-500">
            {release}
          </span>
        </div>
      </body>
    </html>
  );
}
