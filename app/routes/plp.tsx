import {getHotels, PlpContainer, type Hotel} from "~/components/plp/PlpContainer"
import {getDefaultSeoDates} from "~/utils/date-utils"
import type {Route} from "./+types/plp"

type PlpLoaderData = {
    hotels: Array<Hotel>
} | undefined

export async function loader({request}: Route.LoaderArgs): Promise<PlpLoaderData> {
    const url = new URL(request.url)
    const stDate = url.searchParams.get("stDate")
    const rtDate = url.searchParams.get("rtDate")

    if (stDate && rtDate) {
        return undefined
    }

    const {stDate: defaultStDate, rtDate: defaultRtDate} = getDefaultSeoDates()
    return {
        hotels: await getHotels(defaultStDate, defaultRtDate),
    }
}

export async function clientLoader() {
}

export default function Plp({loaderData}: Route.ComponentProps) {
    return (
        <section className="relative flex-1 overflow-hidden bg-slate-50 dark:bg-zinc-950">
            <div className="pointer-events-none absolute -left-32 top-16 size-80 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-900/20"/>
            <div className="pointer-events-none absolute -right-24 top-72 size-72 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20"/>

            <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
                <div className="mb-8 max-w-2xl">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                        Find your stay
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                        A better place to unpack.
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-zinc-400">
                        Handpicked stays, clear prices, and just enough choice to keep planning simple.
                    </p>
                </div>

                <PlpContainer
                    initialHotels={loaderData?.hotels}
                />
            </div>
        </section>
    )
}
