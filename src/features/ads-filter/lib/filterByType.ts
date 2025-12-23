import type { Item } from "@shared/types/items"

export type FilterType = 'auto' | 'property' | 'service'

// Маппинг filterType из URL в ItemType
const filterTypeToItemType: Record<FilterType, 'Авто' | 'Недвижимость' | 'Услуги'> = {
    'auto': 'Авто',
    'property': 'Недвижимость',
    'service': 'Услуги',
}

/**
 * Валидация filterType
 */
export const isValidFilterType = (value: string | null): value is FilterType => {
    return value === 'auto' || value === 'property' || value === 'service'
}

/**
 * Фильтрует массив объявлений по типу из URL
 * @param items - массив объявлений
 * @param filterType - тип фильтра из URL (auto/property/service)
 * @returns отфильтрованный массив объявлений
 */
export const filterItemsByType = (items: Item[], filterType: string | null): Item[] => {
    if (!items.length) return []

    // Если filterType валидный, фильтруем по типу
    if (isValidFilterType(filterType)) {
        const itemType = filterTypeToItemType[filterType]
        return items.filter((item) => item.type === itemType)
    }

    // Если filterType не указан или невалидный, возвращаем все данные
    return items
}

