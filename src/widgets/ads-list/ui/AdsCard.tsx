import type { Item } from "@shared/types/items"
import { Link } from "react-router-dom"
import AdsCardImage from "./AdsCardImage"
import LocationOnIcon from '@mui/icons-material/LocationOn'

const fieldTranslations: Record<string, string> = {
    propertyType: 'Тип недвижимости',
    area: 'Площадь',
    rooms: 'Комнаты',
    price: 'Цена',
    brand: 'Марка',
    model: 'Модель',
    year: 'Год',
    mileage: 'Пробег',
    serviceType: 'Тип услуги',
    experience: 'Опыт',
    cost: 'Стоимость',
    workSchedule: 'График работы'
}

const AdsCard = ({ item }: { item: Item }) => {

    const { id, name, type, description, location, image, ...uniqueFields } = item

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Недвижимость':
                return 'bg-green-100 text-green-800'
            case 'Авто':
                return 'bg-blue-100 text-blue-800'
            case 'Услуги':
                return 'bg-purple-100 text-purple-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Link
            to={`/item/${id}`}
            className="block p-4 rounded-lg"
        >
            <AdsCardImage image={image} alt={name} />
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold ">{name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(type)}`}>
                    {type}
                </span>
            </div>
            <p className=" mb-3">{description}</p>
            <p className="text-sm text-gray-500 mb-3">
                <LocationOnIcon /> {location}
            </p>

            {Object.entries(uniqueFields).map(([k, v]) => {
                const translatedField = fieldTranslations[k] || k
                return (
                    <div key={k} className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-500">{translatedField}</span>
                        <span className="font-medium">{v}</span>
                    </div>
                )
            })}

        </Link>
    )
}

export default AdsCard