import { useSearchParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react'
import type { ItemType } from '@shared/types/items'

// Все возможные фильтры
export interface FilterParams {
  // Общие
  type?: ItemType
  q?: string
  
  // Авто
  brand?: string
  model?: string
  yearFrom?: number
  yearTo?: number
  mileageFrom?: number
  mileageTo?: number
  
  // Недвижимость
  propertyType?: string
  areaFrom?: number
  areaTo?: number
  roomsFrom?: number
  roomsTo?: number
  
  // Услуги
  serviceType?: string
  experienceFrom?: number
  experienceTo?: number
  workSchedule?: string
  
  // Общая цена/стоимость (используется в нескольких типах)
  priceFrom?: number
  priceTo?: number
}

// Ключи по категориям для очистки
const AUTO_KEYS = ['brand', 'model', 'yearFrom', 'yearTo', 'mileageFrom', 'mileageTo'] as const
const PROPERTY_KEYS = ['propertyType', 'areaFrom', 'areaTo', 'roomsFrom', 'roomsTo'] as const
const SERVICE_KEYS = ['serviceType', 'experienceFrom', 'experienceTo', 'workSchedule'] as const
const COMMON_KEYS = ['priceFrom', 'priceTo', 'q'] as const
const ALL_FILTER_KEYS = [...AUTO_KEYS, ...PROPERTY_KEYS, ...SERVICE_KEYS, ...COMMON_KEYS] as const

// Парсинг числа из URL
const parseNumber = (value: string | null): number | undefined => {
  if (!value) return undefined
  const num = Number(value)
  return isNaN(num) ? undefined : num
}

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Текущий тип (Авто, Недвижимость, Услуги или undefined для "Все")
  const type = useMemo<ItemType | undefined>(() => {
    const t = searchParams.get('type')
    if (t === 'Авто' || t === 'Недвижимость' || t === 'Услуги') {
      return t
    }
    return undefined
  }, [searchParams])

  // Поисковый запрос
  const query = useMemo(() => searchParams.get('q') || '', [searchParams])

  // Все фильтры
  const filters = useMemo<FilterParams>(() => ({
    type: type,
    q: query || undefined,
    
    // Авто
    brand: searchParams.get('brand') || undefined,
    model: searchParams.get('model') || undefined,
    yearFrom: parseNumber(searchParams.get('yearFrom')),
    yearTo: parseNumber(searchParams.get('yearTo')),
    mileageFrom: parseNumber(searchParams.get('mileageFrom')),
    mileageTo: parseNumber(searchParams.get('mileageTo')),
    
    // Недвижимость
    propertyType: searchParams.get('propertyType') || undefined,
    areaFrom: parseNumber(searchParams.get('areaFrom')),
    areaTo: parseNumber(searchParams.get('areaTo')),
    roomsFrom: parseNumber(searchParams.get('roomsFrom')),
    roomsTo: parseNumber(searchParams.get('roomsTo')),
    
    // Услуги
    serviceType: searchParams.get('serviceType') || undefined,
    experienceFrom: parseNumber(searchParams.get('experienceFrom')),
    experienceTo: parseNumber(searchParams.get('experienceTo')),
    workSchedule: searchParams.get('workSchedule') || undefined,
    
    // Общие
    priceFrom: parseNumber(searchParams.get('priceFrom')),
    priceTo: parseNumber(searchParams.get('priceTo')),
  }), [searchParams, type, query])

  // Установить тип
  const setType = useCallback((newType: ItemType | undefined) => {
    setSearchParams((prev) => {
      // Очищаем фильтры при смене типа
      ALL_FILTER_KEYS.forEach(key => prev.delete(key))
      
      if (newType) {
        prev.set('type', newType)
      } else {
        prev.delete('type')
      }
      return prev
    })
  }, [setSearchParams])

  // Установить поисковый запрос
  const setQuery = useCallback((value: string) => {
    setSearchParams((prev) => {
      if (value.trim()) {
        prev.set('q', value.trim())
      } else {
        prev.delete('q')
      }
      return prev
    })
  }, [setSearchParams])

  // Установить несколько фильтров
  const setFilters = useCallback((newFilters: Partial<FilterParams>) => {
    setSearchParams((prev) => {
      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'type') return // type устанавливается отдельно
        
        if (value !== undefined && value !== null && value !== '') {
          prev.set(key, String(value))
        } else {
          prev.delete(key)
        }
      })
      return prev
    })
  }, [setSearchParams])

  // Установить один фильтр
  const setFilter = useCallback(<K extends keyof FilterParams>(
    key: K, 
    value: FilterParams[K]
  ) => {
    if (key === 'type') {
      setType(value as ItemType | undefined)
      return
    }
    
    setSearchParams((prev) => {
      if (value !== undefined && value !== null && value !== '') {
        prev.set(key, String(value))
      } else {
        prev.delete(key)
      }
      return prev
    })
  }, [setSearchParams, setType])

  // Очистить фильтры для текущего типа (но оставить тип и поиск)
  const clearTypeFilters = useCallback(() => {
    setSearchParams((prev) => {
      const keysToDelete = type === 'Авто' ? AUTO_KEYS
        : type === 'Недвижимость' ? PROPERTY_KEYS
        : type === 'Услуги' ? SERVICE_KEYS
        : ALL_FILTER_KEYS
      
      keysToDelete.forEach(key => prev.delete(key))
      // Также очищаем общие (цена)
      prev.delete('priceFrom')
      prev.delete('priceTo')
      return prev
    })
  }, [setSearchParams, type])

  // Очистить все фильтры (включая тип и поиск)
  const clearAllFilters = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete('type')
      prev.delete('q')
      ALL_FILTER_KEYS.forEach(key => prev.delete(key))
      return prev
    })
  }, [setSearchParams])

  // Есть ли активные фильтры (без учёта типа)
  const hasActiveFilters = useMemo(() => {
    return ALL_FILTER_KEYS.some(key => searchParams.has(key))
  }, [searchParams])

  return {
    // Данные
    type,
    query,
    filters,
    
    // Действия
    setType,
    setQuery,
    setFilter,
    setFilters,
    clearTypeFilters,
    clearAllFilters,
    
    // Флаги
    hasActiveFilters,
  }
}

