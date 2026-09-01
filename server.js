import express from "express"

const app = express()

const delay = 1000

const hotels = [
    {
        id: "azure-house",
        slug: "azure-house",
        name: "Azure House",
        location: "Santorini, Greece",
        category: "Cliffside retreat",
        rating: 4.9,
        reviews: 184,
        price: 185,
        amenity: "Caldera view",
        description: "A peaceful caldera hideaway with sun-washed rooms, thoughtful local breakfasts, and a terrace made for long evenings.",
        amenities: ["Caldera view", "Breakfast included", "Airport pickup"],
        highlight: "Sunset views from every suite",
    },
    {
        id: "cedar-lodge",
        slug: "cedar-lodge",
        name: "The Cedar Lodge",
        location: "Ubud, Indonesia",
        category: "Jungle hideaway",
        rating: 4.8,
        reviews: 236,
        price: 128,
        amenity: "Private pool",
        description: "A quiet jungle retreat with warm natural textures, leafy views, and a private pool made for slow afternoons.",
        amenities: ["Private pool", "Breakfast included", "Yoga deck"],
        highlight: "A private pool surrounded by palms",
    },
    {
        id: "north-star",
        slug: "north-star",
        name: "North Star Cabin",
        location: "Reykjavík, Iceland",
        category: "Modern cabin",
        rating: 4.7,
        reviews: 97,
        price: 214,
        amenity: "Aurora views",
        description: "A warm modern cabin beneath wide northern skies, with panoramic windows and a private outdoor hot tub.",
        amenities: ["Aurora views", "Outdoor hot tub", "Kitchen"],
        highlight: "Northern lights from your window",
    },
    {
        id: "casa-sol",
        slug: "casa-sol",
        name: "Casa del Sol",
        location: "Barcelona, Spain",
        category: "City apartment",
        rating: 4.8,
        reviews: 312,
        price: 149,
        amenity: "Rooftop terrace",
        description: "A bright city apartment with thoughtful design, a sunny rooftop, and Barcelona's best neighborhoods close by.",
        amenities: ["Rooftop terrace", "Full kitchen", "Central location"],
        highlight: "Golden-hour views over the city",
    },
    {
        id: "willow-stay",
        slug: "willow-stay",
        name: "Willow Stay",
        location: "Cotswolds, England",
        category: "Country cottage",
        rating: 4.6,
        reviews: 121,
        price: 172,
        amenity: "Garden fireplace",
        description: "A cozy stone cottage with a flower-filled garden, an open fireplace, and peaceful countryside walks nearby.",
        amenities: ["Garden fireplace", "Country breakfast", "Pet friendly"],
        highlight: "Quiet evenings beside the fire",
    },
    {
        id: "atelier-hotel",
        slug: "atelier-hotel",
        name: "Atelier Hotel",
        location: "Paris, France",
        category: "Boutique hotel",
        rating: 4.9,
        reviews: 408,
        price: 196,
        amenity: "Breakfast included",
        description: "A small design-led hotel with elegant rooms, generous breakfasts, and an inviting neighborhood feel.",
        amenities: ["Breakfast included", "Balcony rooms", "Metro nearby"],
        highlight: "Parisian mornings on your balcony",
    },
]

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

app.get("/about", (req, res) => {
    console.log("About Called")
    setTimeout(() => {
        res.send({
            eyebrow: "About Stayfinder",
            title: "Better stays start with a simpler search.",
            intro: "We make it easier to discover places worth staying, so you can spend less time comparing tabs and more time looking forward to the trip.",
            story: {
                label: "Our story",
                title: "Built around the way people really travel.",
                paragraphs: [
                    "Stayfinder began with a simple observation: finding the right place to stay should feel exciting, not exhausting. Too many options and too little clarity were getting in the way.",
                    "We bring thoughtful choices, useful details, and an uncomplicated experience together in one place. Whether it is a quick city break or a long-awaited escape, we help every trip begin with confidence.",
                ],
            },
            stats: [
                {value: "120+", label: "Destinations"},
                {value: "8k+", label: "Curated stays"},
                {value: "24/7", label: "Trip support"},
            ],
            values: {
                label: "What guides us",
                title: "Simple choices, thoughtfully made.",
                items: [
                    {
                        title: "Quality first",
                        description: "We focus on places we would genuinely recommend, with the details that matter most.",
                    },
                    {
                        title: "Trust by design",
                        description: "Clear information and honest guidance help you book with confidence every time.",
                    },
                    {
                        title: "Travel made easier",
                        description: "Every decision we make aims to remove friction from finding your next stay.",
                    },
                ],
            },
            cta: {
                title: "Your next favorite stay is waiting.",
                description: "Explore handpicked places and find the one that feels right for your next trip.",
                linkLabel: "Browse stays",
            },
        })
    }, delay)
})

app.get("/hotels", (req, res) => {
    const {stDate, rtDate} = req.query
    console.log("Hotels Called")
    setTimeout(() => {
        if (stDate && rtDate) {
            res.send(hotels)
        }
        else {
            res.status(400).send([])
        }
    }, delay)
})

app.get("/pdp/:slug", (req, res) => {
    const {slug} = req.params
    console.log(`PDP Detail Called: ${slug}`)
    setTimeout(() => {
        const hotel = hotels.find((item) => item.slug === slug)

        if (!hotel) {
            res.status(404).send({message: "Hotel not found"})
            return
        }

        res.send(hotel)
    }, delay)
})

app.get("/pdp/:slug/rooms", (req, res) => {
    const {slug} = req.params
    const {stDate, rtDate} = req.query
    console.log(`Rooms Called: ${slug}`)
    setTimeout(() => {
        if (stDate && rtDate) {
            res.send([
                {
                    id: "sea-view-suite",
                    name: "Sea View Suite",
                    description: "A bright suite with a private terrace overlooking the caldera.",
                    capacity: 2,
                    bed: "1 king bed",
                    price: 245,
                    remaining: 2,
                    amenities: ["Breakfast", "Sea view", "Free cancellation"],
                },
                {
                    id: "courtyard-room",
                    name: "Courtyard Room",
                    description: "A calm, airy room opening onto a quiet Mediterranean courtyard.",
                    capacity: 2,
                    bed: "1 queen bed",
                    price: 185,
                    remaining: 4,
                    amenities: ["Breakfast", "Garden patio", "Free cancellation"],
                },
                {
                    id: "family-loft",
                    name: "Family Loft",
                    description: "A spacious split-level stay designed for slow mornings together.",
                    capacity: 4,
                    bed: "1 king + 2 singles",
                    price: 320,
                    remaining: 1,
                    amenities: ["Kitchenette", "Sea view", "Airport pickup"],
                },
            ])
        }
        else {
            res.status(400).send([])
        }
    }, delay)
})

app.get("/pdp/:slug/comments", (req, res) => {
    const {slug} = req.params
    console.log(`Comments Called: ${slug}`)
    setTimeout(() => {
        res.send([
            {
                id: "review-1",
                name: "Maya Wilson",
                date: "August 2026",
                rating: 5,
                text: "The terrace was even better than the photos. Everything felt thoughtful, calm, and genuinely welcoming.",
            },
            {
                id: "review-2",
                name: "Daniel Kim",
                date: "July 2026",
                rating: 5,
                text: "A beautiful base for exploring the island. Breakfast was excellent and the team made every detail easy.",
            },
            {
                id: "review-3",
                name: "Sofia Martinez",
                date: "June 2026",
                rating: 4,
                text: "Peaceful, spotless, and close to everything we needed. I would happily stay here again.",
            },
        ])
    }, delay)
})

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000")
})
