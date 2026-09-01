import {useQuery} from "@tanstack/react-query"
import {useSearchParams} from "react-router"
import {useState, type FormEvent} from "react"
import {addDays, getDefaultSeoDates} from "~/utils/date-utils"

export type Room = {
    id: string
    name: string
    description: string
    capacity: number
    bed: string
    price: number
    remaining: number
    amenities: Array<string>
}

export function PdpRoomContainer({slug, initialRooms}: {
    slug: string
    initialRooms?: Array<Room>
}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const stDateParam = searchParams.get("stDate")
    const rtDateParam = searchParams.get("rtDate")
    const defaultDates = getDefaultSeoDates()
    const stDate = stDateParam || defaultDates.stDate
    const rtDate = rtDateParam || defaultDates.rtDate

    const {data = [], isPending, isFetching, isError} = useQuery({
        queryKey: ["rooms", slug, stDate, rtDate],
        queryFn: () => getRooms(slug, stDate, rtDate),
        initialData: initialRooms && !stDateParam && !rtDateParam ? initialRooms : undefined,
        staleTime: 5 * 60 * 1000,
    })

    function updateDates(nextStDate: string, nextRtDate: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("stDate", nextStDate)
        params.set("rtDate", nextRtDate)
        setSearchParams(params, {replace: true, preventScrollReset: true})
    }

    return (
        <section aria-labelledby="available-rooms" className="space-y-8">
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
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">Choose your room</p>
                        <h2 id="available-rooms" className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Available rooms</h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">{formatDate(stDate)} – {formatDate(rtDate)} · {getNightCount(stDate, rtDate)} night{getNightCount(stDate, rtDate) === 1 ? "" : "s"}</p>
                    </div>
                    {!isPending && !isError && <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{data.length} room types</p>}
                </div>

                {isError ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                        We couldn’t load rooms for these dates. Please try again.
                    </div>
                ) : isPending ? (
                    <RoomGridSkeleton/>
                ) : (
                    <div className={`grid gap-5 transition-opacity lg:grid-cols-2 ${isFetching ? "opacity-55" : "opacity-100"}`} aria-busy={isFetching}>
                        {data.map((room, index) => <RoomCard key={room.id} room={room} index={index} nights={getNightCount(stDate, rtDate)}/>) }
                    </div>
                )}
            </div>
        </section>
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
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-200/40 sm:p-5 dark:border-white/10 dark:bg-zinc-900 dark:shadow-none">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="flex flex-1 flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-200">Check-in</span>
                    <input type="date" name="stDate" value={stDate} onChange={(event) => handleStartDateChange(event.target.value)} required className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-3 focus:ring-sky-500/15 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-950 dark:[color-scheme:dark]"/>
                </label>
                <label className="flex flex-1 flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-200">Check-out</span>
                    <input type="date" name="rtDate" value={rtDate} min={stDate ? addDays(stDate, 1) : undefined} onChange={(event) => setRtDate(event.target.value)} required className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-3 focus:ring-sky-500/15 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-950 dark:[color-scheme:dark]"/>
                </label>
                <button type="submit" disabled={isLoading || !stDate || !rtDate} className="h-12 rounded-xl bg-sky-600 px-7 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                    {isLoading ? "Checking rooms…" : "Check availability"}
                </button>
            </div>
        </form>
    )
}

function RoomCard({room, index, nights}: { room: Room, index: number, nights: number }) {
    const gradients = [
        "from-sky-100 to-indigo-100 dark:from-sky-950 dark:to-indigo-950",
        "from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950",
        "from-orange-100 to-rose-100 dark:from-orange-950 dark:to-rose-950",
    ]

    return (
        <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                <div className="absolute -right-6 -top-8 size-32 rounded-full border-[22px] border-white/35 dark:border-white/5"/>
                <span className="absolute bottom-4 left-5 rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur dark:bg-black/25 dark:text-zinc-200">
                    Sleeps {room.capacity}
                </span>
            </div>
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{room.name}</h3>
                        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-zinc-400">{room.bed}</p>
                    </div>
                    <p className="shrink-0 text-right text-sm text-slate-500 dark:text-zinc-400"><span className="text-xl font-bold text-slate-950 dark:text-white">${room.price}</span><br/>per night</p>
                </div>
                <p className="mt-4 leading-6 text-slate-600 dark:text-zinc-300">{room.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => <span key={amenity} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-zinc-300">{amenity}</span>)}
                </div>
                <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                    <div>
                        <p className="text-xs font-bold text-rose-500">Only {room.remaining} left</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">${room.price * nights} total for {nights} night{nights === 1 ? "" : "s"}</p>
                    </div>
                    <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-sky-400">Select room</button>
                </div>
            </div>
        </article>
    )
}

function RoomGridSkeleton() {
    return <div className="grid gap-5 lg:grid-cols-2">{[0, 1].map((item) => <div key={item} className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-900"/>)}</div>
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", timeZone: "UTC"}).format(new Date(`${value}T00:00:00Z`))
}

function getNightCount(stDate: string, rtDate: string) {
    const start = new Date(`${stDate}T00:00:00Z`).getTime()
    const end = new Date(`${rtDate}T00:00:00Z`).getTime()
    return Math.max(1, Math.round((end - start) / 86_400_000))
}

export async function getRooms(slug: string, stDate: string, rtDate: string): Promise<Array<Room>> {
    const params = new URLSearchParams({stDate, rtDate})
    const response = await fetch(`http://localhost:4000/pdp/${encodeURIComponent(slug)}/rooms?${params}`)

    if (!response.ok) {
        throw new Error("Could not load rooms")
    }

    return response.json()
}
