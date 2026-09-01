export type Comment = {
    id: string
    name: string
    date: string
    rating: number
    text: string
}

export async function getComments(slug: string): Promise<Array<Comment>> {
    const response = await fetch(`http://localhost:4000/pdp/${encodeURIComponent(slug)}/comments`)

    if (!response.ok) {
        throw new Error("Could not load comments")
    }

    return response.json()
}
