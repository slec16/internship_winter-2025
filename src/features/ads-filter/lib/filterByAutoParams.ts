import type { Item, AutoItem } from "@shared/types/items"

type AutoItemWithPrice = AutoItem & { price?: number }

export const filterByAutoParams = (
    items: Item[],
    searchParams: URLSearchParams
): Item[] => {
    if (!items.length) return []

    const normalize = (value: string | null) =>
        (value ?? "").trim().toLowerCase()

    const parseNumber = (value: string | null): number | undefined => {
        if (!value) return undefined
        const num = Number(value)
        return Number.isNaN(num) ? undefined : num
    }

    const brand = normalize(searchParams.get("brand"))
    const model = normalize(searchParams.get("model"))

    const yearFrom = parseNumber(searchParams.get("yearFrom"))
    const yearTo = parseNumber(searchParams.get("yearTo"))

    const priceFrom = parseNumber(searchParams.get("priceFrom"))
    const priceTo = parseNumber(searchParams.get("priceTo"))


    const hasAnyFilter =
        brand ||
        model ||
        yearFrom !== undefined ||
        yearTo !== undefined ||
        priceFrom !== undefined ||
        priceTo !== undefined

    if (!hasAnyFilter) return items

    return items.filter((item) => {

        if (item.type !== "Авто") return true

        const auto = item as AutoItemWithPrice

        if (brand && !auto.brand.toLowerCase().includes(brand)) return false
        if (model && !auto.model.toLowerCase().includes(model)) return false

        if (yearFrom !== undefined && auto.year < yearFrom) return false
        if (yearTo !== undefined && auto.year > yearTo) return false

        const price = typeof auto.price === "number" ? auto.price : undefined

        if (priceFrom !== undefined) {
            if (price === undefined || price < priceFrom) return false
        }

        if (priceTo !== undefined) {
            if (price === undefined || price > priceTo) return false
        }

        return true
    })
}


