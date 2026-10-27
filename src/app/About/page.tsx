import { ArrowUpRight, BookOpen, Code2, Heart, Lightbulb, Target } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-4xl rounded-3xl border border-zinc-200 bg-zinc-100 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-5 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 transition-transform duration-300 hover:scale-110">
                <Code2 size={25} strokeWidth={1.8} />
              </div>

              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400 transition-transform duration-300 hover:scale-105 hover:text-red-500 ">
                Aspiring Front-End Developer
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-red-700 dark:text-red-400 duration-300 hover:scale-102 hover:text-red-800 dark:hover:text-red-300">
              The person behind Skill Tracker
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl transition-transform duration-300 hover:scale-102">
              Hey, I'm Muntianu Andrei.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              I'm learning web development and working toward
              becoming a Front-End Developer. I enjoy turning
              ideas into real projects, even when I don't know
              exactly how to build them yet.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Skill Tracker is one of those projects. I wanted
              to build something useful while challenging
              myself to learn more about React, TypeScript,
              and how real applications work.
            </p>

            <a
              href="https://github.com/mntandrei"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Muntianu Andrei's GitHub profile"
              className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800 transition-transform duration-300 hover:scale-103">
              <FaGithub size={19} />

              <span>Check out my GitHub</span>

              <ArrowUpRight
                size={17}
                strokeWidth={1.8}/>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 transition-transform duration-300 hover:scale-110">
                <BookOpen
                  size={21}
                  strokeWidth={1.8}/>
              </div>

              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white transition-transform duration-300 hover:scale-103">
                What I've Learned
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                This project has been a wonderful journey for me, full of unexpected insights. 
                I had the chance to dive into React components, explore state and props, and even work with TypeScript and localStorage. 
                I also got to experiment with cool features like drag-and-drop.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                There were definitely some challenges along the way, and I didn't grasp everything immediately. 
                However, the process of troubleshooting, resolving issues, and watching the app gradually come together has truly enriched my experience. 
                I'm grateful for all that I've learned!
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">

              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 transition-transform duration-300 hover:scale-110">
                <Lightbulb
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white transition-transform duration-300 hover:scale-103">
                Learning with AI
              </h2>

              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                I want to be transparent about something: I used AI while building Skill Tracker. 
                It helped me understand new concepts, work through bugs, 
                and write parts of the code that were beyond what I could build on my own at the time.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                I’m still learning how everything works, and that’s the point. 
                I don’t want to rely on AI forever. My goal is to understand what 
                I’m building and eventually create projects like this independently.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 transition-transform duration-300 hover:scale-110">
                <Target
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white duration-300 hover:scale-101">
                  What's Next?
                </h2>

                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  My goal is to become a front-end developer. 
                  I know I still have a lot to learn, but I’m ready to put in the time and effort. 
                  I want to keep strengthening my JavaScript, React, and TypeScript skills, 
                  build more projects, and gain confidence in writing code independently.
                </p>

                <p className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-transform duration-300 hover:scale-101">
                  This is just the beginning.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
            <span>Made by Muntianu Andrei</span>

            <span className="text-zinc-300 dark:text-zinc-600">
              •
            </span>

            <Heart
              size={13}
              strokeWidth={1.8}
              className="text-red-600"/>

            <span>One project at a time.</span>
          </div>

        </div>
      </section>
    </main>
  );
}
