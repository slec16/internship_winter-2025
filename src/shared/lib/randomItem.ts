import { type CreateItem } from "@shared/types/items"

const generateRandomItem = (): CreateItem => {
    const types: Array<'Недвижимость' | 'Авто' | 'Услуги'> = ['Недвижимость', 'Авто', 'Услуги']
    const locations = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань']
    const imagesPriority = [
        'https://i.pinimg.com/736x/ef/05/10/ef05107e79b7c0db1651c664bddc35a4.jpg',
        'https://i.pinimg.com/originals/36/a6/bf/36a6bf58fe3630f2ba62b0cf205e32d9.jpg',
        'https://i.pinimg.com/originals/db/90/0f/db900f2eb0b02551a4b54cb301275bd4.jpg',
        'https://i.pinimg.com/originals/0e/35/4e/0e354e1204c0017bd2bd8cae898c6ddf.jpg',
        'https://i.pinimg.com/originals/d3/b4/e7/d3b4e73dbb4138e75670ce5078271e75.jpg',
        'https://i.pinimg.com/originals/53/e0/20/53e02007ed3ec44876d623c01aaab51f.jpg',
        'https://i.pinimg.com/originals/7b/74/9f/7b749fc75b1627271359c59da84f601c.jpg',
        'https://i.pinimg.com/originals/34/8c/67/348c67b64c873ccad9d64668cb3daec8.jpg'
    ]
    const imagesServices = [
        'https://i.pinimg.com/originals/27/0a/58/270a589c6cdad7e8785e6244871371be.jpg',
        'https://i.pinimg.com/originals/78/bf/2a/78bf2ac051ed5011499d20e6cbe9c14a.jpg'
    ]
    const imagesAuto = [
        'https://i.pinimg.com/736x/ee/b4/8b/eeb48bd571851d11473b2b6570e3f50c.jpg',
        'https://i.pinimg.com/originals/0e/dd/56/0edd56de6758cb9d76a44f38ab708d5d.jpg',
        'https://i.pinimg.com/736x/b9/80/17/b98017e4d44f479e48dd6183f93d3926.jpg',
        'https://i.pinimg.com/originals/9d/33/fb/9d33fbf2fbee082331f4d31526a7bf53.jpg',
        'https://i.pinimg.com/736x/82/78/8e/82788ec0708a44b173c8ff7e0d8d3754.jpg',
    ]
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
                image: imagesPriority,
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
                image: imagesAuto,
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
                cost:


Math.floor(Math.random() * 100000) + 5000,
                workSchedule: schedules[Math.floor(Math.random() * schedules.length)],
                image: imagesServices,
            }
        }
    }
}

export default generateRandomItem