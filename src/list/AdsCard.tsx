import type { Item } from "../types/items"
import { Link } from "react-router-dom"

const AdsCard = ({ item }: { item: Item }) => {

    const { id, name, type, description, location, ...uniqueFields } = item

    console.log(Object.entries(uniqueFields))

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
            to={`/item/${item.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-700"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold ">{item.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                </span>
            </div>
            <p className=" mb-3">{item.description}</p>
            <p className="text-sm text-gray-500 mb-3">
                📍 {item.location}
            </p>

            {Object.entries(uniqueFields).map(([k, v]) => {
                return (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {/* <div> */}
                            <span className="text-gray-500">{k}</span> <span className="font-medium">{v}</span>
                        {/* </div> */}
                    </div>
                )
            })}

        </Link>
    )
}

export default AdsCard

