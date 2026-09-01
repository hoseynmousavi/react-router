import {Link} from "react-router"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/85">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
                <Link
                    to="/"
                    discover="none" prefetch="none"
                    className="group flex items-center gap-2.5"
                    aria-label="Stayfinder home"
                >
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm shadow-sky-500/25 transition-transform group-hover:-rotate-3 group-hover:scale-105">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="size-5"
                        >
                            <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                            <path d="M9.5 20v-5.5h5V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                        Stay<span className="text-sky-600 dark:text-sky-400">finder</span>
                    </span>
                </Link>

                <nav aria-label="Primary navigation" className="flex items-center gap-1 sm:gap-2">
                    <Link
                        to="/"
                        discover="none" prefetch="none"
                        className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white sm:block sm:px-4"
                    >
                        Home
                    </Link>
                    <Link
                        to="/plp"
                        discover="none" prefetch="none"
                        className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white sm:px-4"
                    >
                        Stays
                    </Link>
                    <Link
                        to="/about"
                        discover="none" prefetch="none"
                        className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white sm:px-4"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        discover="none" prefetch="none"
                        className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white sm:px-4"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    )
}
