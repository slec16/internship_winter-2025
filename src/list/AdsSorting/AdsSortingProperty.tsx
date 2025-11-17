
import type { PropertyFilters } from '../../types/filters'

const AdsSortingProperty = ({ className, value, onChange }: { className: string, value: PropertyFilters, onChange: (next: PropertyFilters) => void }) => {

    return(
        <div className={`flex flex-row flex-wrap justify-between py-5 px-3 gap-5 mb-10 rounded-b ${className}`}>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Тип недвижимости
                <input
                    type="text"
                    placeholder="Введите тип недвижимости"
                    value={value.propertyType ?? ''}
                    onChange={(e) => onChange({ ...value, propertyType: e.target.value })}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200"> 
                Площадь
                <input
                    type="number"
                    placeholder="Введите площадь"
                    value={value.area ?? ''}
                    onChange={(e) => {
                        const v = e.target.value
                        onChange({ ...value, area: v === '' ? undefined : Number(v) })
                    }}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Комнаты
                <input
                    type="number"
                    placeholder="Введите количество комнат"
                    value={value.rooms ?? ''}
                    onChange={(e) => {
                        const v = e.target.value
                        onChange({ ...value, rooms: v === '' ? undefined : Number(v) })
                    }}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Цена
                <input
                    type="number"
                    placeholder="Введите цену"
                    value={value.price ?? ''}
                    onChange={(e) => {
                        const v = e.target.value
                        onChange({ ...value, price: v === '' ? undefined : Number(v) })
                    }}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
        </div>
    )
}

export default AdsSortingProperty