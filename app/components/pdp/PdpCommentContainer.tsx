import {useQuery} from "@tanstack/react-query"

export type Comment = {
    id: string
    name: string
    date: string
    rating: number
    text: string
}

export function PdpCommentContainer({slug, initialComments}: {
    slug: string
    initialComments?: Array<Comment>
}) {
    const {data = [], isPending, isError} = useQuery({
        queryKey: ["comments", slug],
        queryFn: () => getComments(slug),
        initialData: initialComments,
        staleTime: 5 * 60 * 1000,
    })

    if (isError) {
        return (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                We couldn’t load guest comments. Please try again.
            </div>
        )
    }

    if (isPending) {
        return <CommentsGridSkeleton/>
    }

    return (
        <div className="grid gap-5 md:grid-cols-3">
            {data.map((comment) => (
                <article key={comment.id} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="text-sm tracking-wider text-amber-400" aria-label={`${comment.rating} out of 5 stars`}>
                        {"★".repeat(comment.rating)}<span className="text-slate-200 dark:text-zinc-700">{"★".repeat(5 - comment.rating)}</span>
                    </div>
                    <p className="mt-4 leading-7 text-slate-600 dark:text-zinc-300">“{comment.text}”</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
                        <span className="grid size-10 place-items-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                            {comment.name.charAt(0)}
                        </span>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{comment.name}</p>
                            <p className="text-xs text-slate-400">{comment.date}</p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}

function CommentsGridSkeleton() {
    return (
        <div className="grid gap-5 md:grid-cols-3" aria-label="Loading comments">
            {[0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-900"/>)}
        </div>
    )
}

export async function getComments(slug: string): Promise<Array<Comment>> {
    const response = await fetch(`http://localhost:4000/pdp/${encodeURIComponent(slug)}/comments`)

    if (!response.ok) {
        throw new Error("Could not load comments")
    }

    return response.json()
}
