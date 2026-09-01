import {Link} from "react-router"

export function loader() {
}

export async function clientLoader() {
}

export default function Home() {
    return (
        <div className="relative flex flex-1 overflow-hidden bg-slate-50 dark:bg-zinc-950">
            <div className="pointer-events-none absolute -left-24 top-8 size-80 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-900/20"/>
            <div className="pointer-events-none absolute -right-28 bottom-10 size-96 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20"/>

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
                <section className="max-w-2xl">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                        Your next stay, simplified
                    </p>
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                        Find somewhere that feels just right.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-zinc-400">
                        Discover thoughtful places to stay, compare clear options, and start your next trip with less searching.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to="/plp?stDate=2026-09-02&rtDate=2026-09-04"
                            discover="none" prefetch="none"
                            className="rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700"
                        >
                            Browse stays
                        </Link>
                        <Link
                            to="/about"
                            discover="none" prefetch="none"
                            className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-sky-800 dark:hover:text-sky-300"
                        >
                            Our story
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-500 dark:text-zinc-400">
                        <span>✓ Handpicked stays</span>
                        <span>✓ Clear prices</span>
                        <span>✓ Simple planning</span>
                    </div>
                </section>

                <section aria-label="Featured stay" className="relative mx-auto w-full max-w-lg">
                    <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-sky-200 to-indigo-200 opacity-60 dark:from-sky-950 dark:to-indigo-950"/>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-2xl shadow-slate-300/50 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/30">
                        <div className="relative h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-300 dark:from-sky-950 dark:via-cyan-950 dark:to-indigo-950">
                            <div className="absolute -right-10 -top-12 size-52 rounded-full border-[34px] border-white/35 dark:border-white/5"/>
                            <div className="absolute left-6 top-6 rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur dark:bg-black/25 dark:text-zinc-200">
                                Guest favorite
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/50 bg-white/70 p-5 backdrop-blur-md dark:border-white/10 dark:bg-black/30">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">Santorini, Greece</p>
                                <div className="mt-2 flex items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Azure House</h2>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Cliffside retreat</p>
                                    </div>
                                    <p className="shrink-0 text-sm font-bold text-slate-800 dark:text-zinc-100"><span className="text-amber-400">★</span> 4.9</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-5">
                            <div>
                                <p className="text-xs text-slate-400 dark:text-zinc-500">From</p>
                                <p className="mt-1 font-bold text-slate-950 dark:text-white">$185 <span className="text-sm font-normal text-slate-500 dark:text-zinc-400">/ night</span></p>
                            </div>
                            <Link
                                to="/pdp/azure-house"
                                discover="none" prefetch="none"
                                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-sky-400"
                            >
                                View stay
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
