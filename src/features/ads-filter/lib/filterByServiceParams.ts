import type { Item, ServiceItem } from "@shared/types/items"

export const filterByServiceParams = (
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

    const parseStringArray = (value: string | null): string[] => {
        if (!value) return []
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
    }

    const matchesExperience = (years: number, experienceFilters: string[]): boolean => {
        if (experienceFilters.length === 0) return true

        return experienceFilters.some((filter) => {
            switch (filter) {
                case "Без опыта":
                    return years === 0
                case "1-3 года":
                    return years >= 1 && years <= 3
                case "3-6 лет":
                    return years >= 3 && years <= 6
                case "Более 6 лет":
                    return years > 6
                default:
                    return false
            }
        })
    }

    const serviceType = normalize(searchParams.get("serviceType"))
    const experienceFilters = parseStringArray(searchParams.get("experience"))
    const scheduleFilters = parseStringArray(searchParams.get("schedule"))

    const priceFrom = parseNumber(searchParams.get("priceFrom"))
    const priceTo = parseNumber(searchParams.get("priceTo"))

    const hasAnyFilter =
        serviceType ||
        experienceFilters.length > 0 ||
        scheduleFilters.length > 0 ||
        priceFrom !== undefined ||
        priceTo !== undefined

    if (!hasAnyFilter) return items

    return items.filter((item) => {

        if (item.type !== "Услуги") return true

        const service = item as ServiceItem

        if (serviceType && !service.serviceType.toLowerCase().includes(serviceType)) {
            return false
        }

        if (experienceFilters.length > 0) {
            if (!matchesExperience(service.experience, experienceFilters)) {
                return false
            }
        }

        if (scheduleFilters.length > 0) {
            if (!service.workSchedule || !scheduleFilters.includes(service.workSchedule)) {
                return false
            }
        }

        if (priceFrom !== undefined && service.cost < priceFrom) return false
        if (priceTo !== undefined && service.cost > priceTo) return false

        return true
    })
}

