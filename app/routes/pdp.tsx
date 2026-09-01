import {useQuery} from "@tanstack/react-query"
import {Link} from "react-router"
import {getComments, PdpCommentContainer, type Comment} from "~/components/pdp/PdpCommentContainer"
import {getRooms, PdpRoomContainer, type Room} from "~/components/pdp/PdpRoomContainer"
import {getDefaultSeoDates} from "~/utils/date-utils"
import type {Route} from "./+types/pdp"

type PdpDetail = {
    slug: string
    name: string
    location: string
    category: string
    rating: number
    reviews: number
    description: string
    amenities: Array<string>
    highlight: string
}

type PdpLoaderData = {
    detail: PdpDetail
    rooms: Array<Room>
    comments: Array<Comment>
} | undefined

export async function loader({params, request}: Route.LoaderArgs): Promise<PdpLoaderData> {
    const url = new URL(request.url)
    const stDate = url.searchParams.get("stDate")
    const rtDate = url.searchParams.get("rtDate")

    if (stDate && rtDate) {
        return undefined
    }

    const {stDate: defaultStDate, rtDate: defaultRtDate} = getDefaultSeoDates()
    const [detail, rooms, comments] = await Promise.all([
        getProperty(params.slug),
        getRooms(params.slug, defaultStDate, defaultRtDate),
        getComments(params.slug),
    ])

    return {detail, rooms, comments}
}

export async function clientLoader() {
}

export default function Pdp({loaderData, params}: Route.ComponentProps) {
    return (
        <div className="flex-1 bg-slate-50 dark:bg-zinc-950">
            <PropertyHeroContainer
                slug={params.slug}
                initialDetail={loaderData?.detail}
            />

            <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
                <PdpRoomContainer
                    slug={params.slug}
                    initialRooms={loaderData?.rooms}
                />

                <section className="mt-16 border-t border-slate-200 pt-12 dark:border-white/10">
                    <div className="mb-7">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">Guest notes</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">What people are saying</h2>
                    </div>
                    <PdpCommentContainer
                        slug={params.slug}
                        initialComments={loaderData?.comments}
                    />
                </section>
            </div>
        </div>
    )
}

function PropertyHeroContainer({slug, initialDetail}: { slug: string, initialDetail: PdpDetail | undefined }) {
    const query = useQuery({
        queryKey: ["property", slug],
        queryFn: () => getProperty(slug),
        initialData: initialDetail,
        staleTime: 5 * 60 * 1000,
    })

    if (query.isPending) {
        return <HeroSkeleton/>
    }

    if (query.isError) {
        return (
            <div className="border-b border-rose-200 bg-rose-50 px-5 py-12 text-center text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                We couldn’t load this property. Please try again.
            </div>
        )
    }

    return <PropertyHero detail={query.data}/>
}

function PropertyHero({detail}: { detail: PdpDetail }) {
    return (
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-white/10 dark:bg-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_40%)]"/>
            <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
                <Link
                    to="/plp"
                    discover="none" prefetch="none"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400"
                >
                    <span aria-hidden="true">←</span> Back to stays
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-sky-50 px-3 py-1.5 font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">{detail.category}</span>
                            <span className="font-semibold text-slate-700 dark:text-zinc-200">★ {detail.rating}</span>
                            <span className="text-slate-400">{detail.reviews} reviews</span>
                        </div>
                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">{detail.name}</h1>
                        <p className="mt-3 text-lg text-slate-500 dark:text-zinc-400">{detail.location}</p>
                        <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-zinc-300">{detail.description}</p>
                        <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-slate-600 dark:text-zinc-300">
                            {detail.amenities.map((item) => (
                                <span key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-zinc-900">✓ {item}</span>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-72 overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-200 via-cyan-100 to-indigo-200 shadow-2xl shadow-sky-200/50 sm:h-80 dark:from-sky-950 dark:via-cyan-950 dark:to-indigo-950 dark:shadow-none">
                        <div className="absolute -right-10 -top-12 size-52 rounded-full border-[34px] border-white/35 dark:border-white/5"/>
                        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/50 bg-white/65 p-5 backdrop-blur-md dark:border-white/10 dark:bg-black/25">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">Guest favorite</p>
                            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{detail.highlight}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

async function getProperty(slug: string): Promise<PdpDetail> {
    const response = await fetch(`http://localhost:4000/pdp/${encodeURIComponent(slug)}`)

    if (!response.ok) {
        throw new Error("Could not load property details")
    }

    return response.json()
}

function HeroSkeleton() {
    return (
        <div className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-zinc-950" aria-label="Loading property details">
            <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2">
                <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-900"/>
                <div className="h-72 animate-pulse rounded-[2rem] bg-slate-200 dark:bg-zinc-900"/>
            </div>
        </div>
    )
}
