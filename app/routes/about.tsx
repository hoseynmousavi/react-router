import {useQuery} from "@tanstack/react-query"
import {Link} from "react-router"
import type {Route} from "./+types/about"

type AboutContent = {
    eyebrow: string
    title: string
    intro: string
    story: {
        label: string
        title: string
        paragraphs: string[]
    }
    stats: Array<{
        value: string
        label: string
    }>
    values: {
        label: string
        title: string
        items: Array<{
            title: string
            description: string
        }>
    }
    cta: {
        title: string
        description: string
        linkLabel: string
    }
}

export async function loader(): Promise<AboutContent> {
    return getAboutContent()
}

export async function clientLoader() {
}

export default function About({loaderData}: Route.ComponentProps) {
    const query = useQuery({
        queryKey: ["about"],
        queryFn: getAboutContent,
        initialData: loaderData,
        staleTime: 5 * 60 * 1000,
    })

    if (query.isPending) {
        return <AboutSkeleton/>
    }

    if (query.isError) {
        return <AboutError/>
    }

    const content = query.data

    return (
        <div className="overflow-hidden bg-white dark:bg-zinc-950">
            <section className="relative isolate border-b border-slate-200/80 px-5 py-20 sm:px-8 sm:py-28 dark:border-white/10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(79,70,229,0.12),transparent_30%)]"/>
                <div className="absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full border border-sky-200/50 dark:border-sky-400/10"/>
                <div className="absolute left-1/2 top-24 -z-10 h-48 w-48 -translate-x-1/2 rounded-full border border-indigo-200/60 dark:border-indigo-400/10"/>

                <div className="mx-auto max-w-4xl text-center">
                    <p className="mx-auto mb-6 w-fit rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-semibold text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
                        {content.eyebrow}
                    </p>
                    <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                        {content.title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600 dark:text-zinc-300">
                        {content.intro}
                    </p>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-8 sm:py-24">
                <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 shadow-2xl shadow-sky-900/15">
                        <div className="absolute -right-12 -top-12 size-52 rounded-full border border-white/20"/>
                        <div className="absolute -right-4 top-8 size-32 rounded-full border border-white/20"/>
                        <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-white/10 blur-sm"/>
                        <div className="relative flex h-full flex-col justify-between text-white">
                            <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
                                    <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                                    <path d="M9.5 20v-5.5h5V20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <p className="max-w-xs text-3xl font-semibold leading-tight tracking-tight">
                                {content.story.title}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            {content.story.label}
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            {content.story.title}
                        </h2>
                        <div className="mt-6 space-y-5 text-base leading-7 text-slate-600 dark:text-zinc-300">
                            {content.story.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-8 dark:border-white/10">
                            {content.stats.map((stat) => (
                                <div key={stat.label}>
                                    <dt className="text-sm text-slate-500 dark:text-zinc-400">{stat.label}</dt>
                                    <dd className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-24 dark:bg-white/[0.03]">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                            {content.values.label}
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                            {content.values.title}
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {content.values.items.map((item, index) => (
                            <article
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-zinc-900"
                            >
                                <span className="grid size-11 place-items-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                                    <ValueIcon index={index}/>
                                </span>
                                <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
                                <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-8 sm:py-24">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-slate-950 px-7 py-10 sm:flex-row sm:items-center sm:px-12 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-slate-900">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white">{content.cta.title}</h2>
                        <p className="mt-3 leading-7 text-slate-300">{content.cta.description}</p>
                    </div>
                    <Link
                        to="/plp"
                        discover="none" prefetch="none"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-105"
                    >
                        {content.cta.linkLabel}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

function AboutSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-8 bg-white px-5 py-20 sm:px-8 dark:bg-zinc-950" aria-label="Loading about Stayfinder">
            <div className="mx-auto h-48 w-full max-w-4xl animate-pulse rounded-[2rem] bg-slate-200 dark:bg-zinc-900"/>
            <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
                <div className="aspect-square animate-pulse rounded-[2rem] bg-slate-200 dark:bg-zinc-900"/>
                <div className="animate-pulse rounded-[2rem] bg-slate-200 dark:bg-zinc-900"/>
            </div>
        </div>
    )
}

function AboutError() {
    return (
        <div className="grid flex-1 place-items-center bg-white px-5 py-20 text-center dark:bg-zinc-950">
            <div>
                <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Could not load this page</h1>
                <p className="mt-3 text-slate-600 dark:text-zinc-400">Please try again in a moment.</p>
            </div>
        </div>
    )
}

async function getAboutContent(): Promise<AboutContent> {
    const response = await fetch(`http://localhost:4000/about`)

    if (!response.ok) {
        throw new Error("Failed to load the about page content")
    }

    return response.json()
}

function ValueIcon({index}: { index: number }) {
    if (index === 0) {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                <path d="m12 3 2.4 4.86L20 8.67l-4 3.9.94 5.51L12 15.5l-4.94 2.58L8 12.57l-4-3.9 5.6-.81L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            </svg>
        )
    }

    if (index === 1) {
        return (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                <path d="M12 21s7-3.7 7-10V5l-7-2-7 2v6c0 6.3 7 10 7 10Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
            <path d="M4 13.5V19h5.5M20 10.5V5h-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.3 9A7 7 0 0 1 18 6l2 2M17.7 15A7 7 0 0 1 6 18l-2-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        </svg>
    )
}
