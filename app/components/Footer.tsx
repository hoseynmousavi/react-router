import {Link} from "react-router"

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-zinc-950">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
                <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Stayfinder</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                        Find a stay that feels just right.
                    </p>
                </div>
                <div className="flex items-center gap-5 text-sm text-slate-500 dark:text-zinc-400">
                    <Link to="/about" discover="none" prefetch="none" className="transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                        About
                    </Link>
                    <Link to="/plp" discover="none" prefetch="none" className="transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                        Browse stays
                    </Link>
                    <Link to="/contact" discover="none" prefetch="none" className="transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                        Contact
                    </Link>
                    <span aria-label="Copyright 2026">© 2026</span>
                </div>
            </div>
        </footer>
    )
}
