import type { Item } from "@/shared/types/items"

export const filterBySearchParams = (items: Item[], searchParams: URLSearchParams): Item[] => {
    if(!items.length) return []

    const searchQuery = (searchParams.get("q") || "").trim().toLowerCase()

    if(!searchQuery) return items

    return items.filter((item) => {
        
        const matchesName = item.name.toLowerCase().includes(searchQuery)
        const matchesDescription = item.description.toLowerCase().includes(searchQuery)
    
        if(matchesDescription || matchesName) return true

        switch (item.type) {
            case "Авто": {
                const matchesBrand = item.brand.toLowerCase().includes(searchQuery)
                const matchesModel = item.model.toLowerCase().includes(searchQuery)
                return matchesBrand || matchesModel
            } 
            case "Недвижимость": {
                return item.propertyType.toLowerCase().includes(searchQuery)
            }
            case "Услуги": {
                return item.serviceType.toLowerCase().includes(searchQuery)
            }
            default: return false
        }

    })
}