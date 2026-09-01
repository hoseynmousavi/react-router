import {useQuery} from "@tanstack/react-query"
import {Link, useSearchParams} from "react-router"
import {useState, type FormEvent} from "react"
import {addDays, getDefaultSeoDates} from "~/utils/date-utils"

export type Hotel = {
    id: string
    slug: string
    name: string
    location: string
    category: string
    rating: number
    reviews: number
    price: number
    amenity: string
}

export function PlpContainer({initialHotels}: {
    initialHotels?: Array<Hotel>
}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const stDateParam = searchParams.get("stDate")
    const rtDateParam = searchParams.get("rtDate")
    const defaultDates = getDefaultSeoDates()

    const stDate = stDateParam || defaultDates.stDate
    const rtDate = rtDateParam || defaultDates.rtDate

    const {data = [], isPending, isFetching, isError} = useQuery({
        queryKey: ["hotels", stDate, rtDate],
        queryFn: () => getHotels(stDate, rtDate),
        initialData: initialHotels && !stDateParam && !rtDateParam ? initialHotels : undefined,
        staleTime: 5 * 60 * 1000,
    })

    function updateDates(nextStDate: string, nextRtDate: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("stDate", nextStDate)
        params.set("rtDate", nextRtDate)
        setSearchParams(params, {replace: true, preventScrollReset: true})
    }

    return (
        <div className="space-y-9">
            <DatePicker
                key={`${stDate}-${rtDate}`}
                initialStDate={stDate}
                initialRtDate={rtDate}
                isLoading={isFetching}
                onSubmit={updateDates}
            />

            <div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                            Stays we think you’ll love
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                            {formatDate(stDate)} – {formatDate(rtDate)} · {getNightCount(stDate, rtDate)} night{getNightCount(stDate, rtDate) === 1 ? "" : "s"}
                        </p>
                    </div>
                    {!isPending && !isError && (
                        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                            {data.length} stays available
                        </p>
                    )}
                </div>

                {isError ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                        We couldn’t load these stays. Please try again in a moment.
                    </div>
                ) : isPending ? (
                    <HotelGridSkeleton/>
                ) : (
                    <div
                        className={`grid gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${isFetching ? "opacity-55" : "opacity-100"}`}
                        aria-busy={isFetching}
                    >
                        {data.map((hotel, index) => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                                index={index}
                                href={getPdpHref(hotel.slug, stDateParam, rtDateParam)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function DatePicker({initialStDate, initialRtDate, isLoading, onSubmit}: {
    initialStDate: string
    initialRtDate: string
    isLoading: boolean
    onSubmit: (stDate: string, rtDate: string) => void
}) {
    const [stDate, setStDate] = useState(initialStDate)
    const [rtDate, setRtDate] = useState(initialRtDate)

    function handleStartDateChange(nextStDate: string) {
        setStDate(nextStDate)

        if (nextStDate && rtDate <= nextStDate) {
            setRtDate(addDays(nextStDate, 1))
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nextStDate = formData.get("stDate")
        const nextRtDate = formData.get("rtDate")

        if (typeof nextStDate === "string" && typeof nextRtDate === "string") {
            onSubmit(nextStDate, nextRtDate)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-200/40 sm:p-5 dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-200">Check-in</span>
                    <input
                        type="date"
                        name="stDate"
                        value={stDate}
                        onChange={(event) => handleStartDateChange(event.target.value)}
                        required
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-3 focus:ring-sky-500/15 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-950 dark:[color-scheme:dark]"
                    />
                </label>

                <label className="flex flex-1 flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-200">Check-out</span>
                    <input
                        type="date"
                        name="rtDate"
                        value={rtDate}
                        min={stDate ? addDays(stDate, 1) : undefined}
                        onChange={(event) => setRtDate(event.target.value)}
                        required
                        className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-3 focus:ring-sky-500/15 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-950 dark:[color-scheme:dark]"
                    />
                </label>

                <button
                    type="submit"
                    disabled={isLoading || !stDate || !rtDate}
                    className="h-12 rounded-xl bg-sky-600 px-7 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                    {isLoading ? "Finding stays…" : "Search stays"}
                </button>
            </div>
        </form>
    )
}

function HotelCard({hotel, index, href}: { hotel: Hotel, index: number, href: string }) {
    const backgrounds = [
        "from-sky-100 via-cyan-50 to-blue-200 dark:from-sky-950 dark:via-cyan-950 dark:to-blue-950",
        "from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950",
        "from-indigo-100 via-violet-50 to-purple-200 dark:from-indigo-950 dark:via-violet-950 dark:to-purple-950",
        "from-orange-100 via-amber-50 to-rose-100 dark:from-orange-950 dark:via-amber-950 dark:to-rose-950",
        "from-lime-100 via-green-50 to-emerald-100 dark:from-lime-950 dark:via-green-950 dark:to-emerald-950",
        "from-fuchsia-100 via-pink-50 to-rose-100 dark:from-fuchsia-950 dark:via-pink-950 dark:to-rose-950",
    ]

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-white/10 dark:bg-zinc-900 dark:hover:shadow-black/20">
            <div className={`relative flex h-40 items-end overflow-hidden bg-gradient-to-br p-5 ${backgrounds[index % backgrounds.length]}`}>
                <div className="absolute -right-6 -top-8 size-28 rounded-full border-[18px] border-white/35 dark:border-white/5"/>
                <div className="absolute bottom-4 right-5 text-6xl font-black tracking-tighter text-white/65 dark:text-white/10" aria-hidden="true">
                    {hotel.name.charAt(0)}
                </div>
                <span className="relative rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur dark:bg-black/25 dark:text-zinc-200">
                    {hotel.category}
                </span>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white">{hotel.name}</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{hotel.location}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-slate-800 dark:text-zinc-100">
                        <span className="text-amber-400" aria-hidden="true">★</span>
                        {hotel.rating}
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                    <div>
                        <p className="text-xs text-slate-400 dark:text-zinc-500">{hotel.amenity} · {hotel.reviews} reviews</p>
                    </div>
                    <p className="shrink-0 text-sm text-slate-500 dark:text-zinc-400">
                        <span className="text-lg font-bold text-slate-950 dark:text-white">${hotel.price}</span> / night
                    </p>
                </div>
                <Link
                    to={href}
                    discover="none" prefetch="none"
                    className="mt-4 block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-sky-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-sky-400"
                >
                    View stay
                </Link>
            </div>
        </article>
    )
}

function HotelGridSkeleton() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
                <div key={item} className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-900"/>
            ))}
        </div>
    )
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", timeZone: "UTC"})
        .format(new Date(`${value}T00:00:00Z`))
}

function getNightCount(stDate: string, rtDate: string) {
    const start = new Date(`${stDate}T00:00:00Z`).getTime()
    const end = new Date(`${rtDate}T00:00:00Z`).getTime()
    return Math.max(1, Math.round((end - start) / 86_400_000))
}

function getPdpHref(slug: string, stDate: string | null, rtDate: string | null) {
    const pathname = `/pdp/${encodeURIComponent(slug)}`

    if (!stDate || !rtDate) {
        return pathname
    }

    const params = new URLSearchParams({stDate, rtDate})
    return `${pathname}?${params}`
}

export async function getHotels(stDate: string, rtDate: string): Promise<Array<Hotel>> {
    const params = new URLSearchParams({stDate, rtDate})
    const response = await fetch(`http://localhost:4000/hotels?${params}`)

    if (!response.ok) {
        throw new Error("Could not load stays")
    }

    const data: Array<Hotel | string> = await response.json()
    return data.map(normalizeHotel)
}

function normalizeHotel(hotel: Hotel | string, index: number): Hotel {
    if (typeof hotel !== "string") {
        return {...hotel, slug: hotel.slug || hotel.id}
    }

    const name = hotel
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")

    return {
        id: `legacy-${hotel}-${index}`,
        slug: `legacy-${hotel}-${index}`,
        name,
        location: "Featured destination",
        category: "Recommended stay",
        rating: 4.7,
        reviews: 100 + index * 17,
        price: 120 + index * 18,
        amenity: "Guest favorite",
    }
}
