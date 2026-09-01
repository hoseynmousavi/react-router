export const HOTEL_TIME_ZONE = "Asia/Tehran"

function formatDateInTehran(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: HOTEL_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date)

    const part = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((item) => item.type === type)?.value ?? ""

    return `${part("year")}-${part("month")}-${part("day")}`
}

export function addDays(date: string, days: number) {
    const value = new Date(`${date}T12:00:00Z`)
    value.setUTCDate(value.getUTCDate() + days)
    return value.toISOString().slice(0, 10)
}

export function getDefaultSeoDates(now = new Date()) {
    const today = formatDateInTehran(now)

    return {
        stDate: today,
        rtDate: addDays(today, 1),
    }
}
