import { type CreateItem } from "../types/items"

const generateRandomItem = (): CreateItem => {
    const types: Array<'Недвижимость' | 'Авто' | 'Услуги'> = ['Недвижимость', 'Авто', 'Услуги']
    const locations = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань']
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]

    switch (randomType) {
        case 'Недвижимость': {
            const propertyTypes = ['Квартира', 'Дом', 'Студия', 'Таунхаус']
            return {
                name: `${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} в ${randomLocation}`,
                description: `Отличная недвижимость в центре города`,
                location: randomLocation,
                type: 'Недвижимость',
                propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
                area: Math.floor(Math.random() * 100) + 30,
                rooms: Math.floor(Math.random() * 4) + 1,
                price: Math.floor(Math.random() * 20000000) + 3000000,
            }
        }
        case 'Авто': {
            const brands = ['Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen']
            const models = ['Camry', 'X5', 'C-Class', 'A4', 'Golf']
            const brandIndex = Math.floor(Math.random() * brands.length)
            return {
                name: `${brands[brandIndex]} ${models[brandIndex]}`,
                description: `Отличное состояние, один владелец`,
                location: randomLocation,
                type: 'Авто',
                brand: brands[brandIndex],
                model: models[brandIndex],
                year: Math.floor(Math.random() * 10) + 2015,
                mileage: Math.floor(Math.random() * 150000) + 10000,
            }
        }
        case 'Услуги': {
            const serviceTypes = ['Ремонт', 'Уборка', 'Доставка', 'Консультация', 'Обучение']
            const schedules = ['Пн-Пт, 9:00-18:00', 'Пн-Вс, 10:00-20:00', 'По договоренности']
            return {
                name: `Услуга: ${serviceTypes[Math.floor(Math.random() * serviceTypes.length)]}`,
                description: `Профессиональное выполнение работ`,
                location: randomLocation,
                type: 'Услуги',
                serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
                experience: Math.floor(Math.random() * 15) + 1,
                cost: Math.floor(Math.random() * 100000) + 5000,
                workSchedule: schedules[Math.floor(Math.random() * schedules.length)],
            }
        }
    }
}

export default generateRandomItem



