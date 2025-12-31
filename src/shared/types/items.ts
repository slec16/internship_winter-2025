export type ItemType = 'Недвижимость' | 'Авто' | 'Услуги'

// Базовый интерфейс объявления
export interface BaseItem {
    id?: number
    name: string
    description: string
    location: string
    type: ItemType
    image?: string[]
}

// Недвижимость
export interface PropertyItem extends BaseItem {
    type: 'Недвижимость'
    propertyType: string
    area: number
    rooms: number
    price: number
}

// Авто
export interface AutoItem extends BaseItem {
    type: 'Авто'
    brand: string
    model: string
    year: number
    mileage?: number
}

// Услуги
export interface ServiceItem extends BaseItem {
    type: 'Услуги'
    serviceType: string
    experience: number
    cost: number
    workShedule?: string
}

// Объединенный тип для всех объявлений
export type Item = PropertyItem | AutoItem | ServiceItem

// Типы для создания объявлений (без id)
export type CreatePropertyItem = Omit<PropertyItem, 'id'>
export type CreateAutoItem = Omit<AutoItem, 'id'>
export type CreateServiceItem = Omit<ServiceItem, 'id'>
export type CreateItem = CreatePropertyItem | CreateAutoItem | CreateServiceItem

// Типы для обновления объявлений (все поля опциональны кроме id)
export type UpdatePropertyItem = Partial<Omit<PropertyItem, 'id'>> & { id: number }
export type UpdateAutoItem = Partial<Omit<AutoItem, 'id'>> & { id: number }
export type UpdateServiceItem = Partial<Omit<ServiceItem, 'id'>> & { id: number }
export type UpdateItem = UpdatePropertyItem | UpdateAutoItem | UpdateServiceItem