import type { Item, PropertyItem } from "@shared/types/items"

export const filterByPropertyParams = (
    items: Item[],
    searchParams: URLSearchParams
): Item[] => {
    if (!items.length) return []

    const parseNumber = (value: string | null): number | undefined => {
        if (!value) return undefined
        const num = Number(value)
        return Number.isNaN(num) ? undefined : num
    }

    const parseStringArray = (value: string | null): string[] => {
        if (!value) return []
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
    }

    const parseNumberArray = (value: string | null): number[] => {
        if (!value) return []
        return value
            .split(",")
            .map((item) => Number(item.trim()))
            .filter((num) => !Number.isNaN(num))
    }

    const propertyTypes = parseStringArray(searchParams.get("propertyTypes"))
    const rooms = parseNumberArray(searchParams.get("rooms"))

    const areaFrom = parseNumber(searchParams.get("areaFrom"))
    const areaTo = parseNumber(searchParams.get("areaTo"))

    const priceFrom = parseNumber(searchParams.get("priceFrom"))
    const priceTo = parseNumber(searchParams.get("priceTo"))

    const hasAnyFilter =
        propertyTypes.length > 0 ||
        rooms.length > 0 ||
        areaFrom !== undefined ||
        areaTo !== undefined ||
        priceFrom !== undefined ||
        priceTo !== undefined

    if (!hasAnyFilter) return items

    return items.filter((item) => {

        if (item.type !== "Недвижимость") return true

        const property = item as PropertyItem

        if (propertyTypes.length > 0) {
            if (!propertyTypes.includes(property.propertyType)) return false
        }

        if (rooms.length > 0) {
            if (!rooms.includes(property.rooms)) return false
        }


        if (areaFrom !== undefined && property.area < areaFrom) return false
        if (areaTo !== undefined && property.area > areaTo) return false

        if (priceFrom !== undefined && property.price < priceFrom) return false
        if (priceTo !== undefined && property.price > priceTo) return false

        return true
    })
}

