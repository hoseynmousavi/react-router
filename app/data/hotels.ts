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
