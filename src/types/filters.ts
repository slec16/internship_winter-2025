import type { AutoItem, PropertyItem, ServiceItem } from './items'

export type AutoFilters = Partial<Pick<AutoItem, 'brand' | 'model' | 'year' | 'mileage'>>
export type PropertyFilters = Partial<Pick<PropertyItem, 'propertyType' | 'area' | 'rooms' | 'price'>>
export type ServiceFilters = Partial<Pick<ServiceItem, 'serviceType' | 'experience' | 'cost' | 'workSchedule'>>


