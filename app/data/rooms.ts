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

export async function getRooms(slug: string, stDate: string, rtDate: string): Promise<Array<Room>> {
    const params = new URLSearchParams({stDate, rtDate})
    const response = await fetch(`http://localhost:4000/pdp/${encodeURIComponent(slug)}/rooms?${params}`)

    if (!response.ok) {
        throw new Error("Could not load rooms")
    }

    return response.json()
}
