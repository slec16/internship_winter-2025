import type { AutoFilters } from '@shared/types/filters'

const AdsSortingAuto = ({ className, value, onChange }: { className: string, value: AutoFilters, onChange: (next: AutoFilters) => void }) => {

    return(
        <div className={`flex flex-row flex-wrap justify-between py-5 px-3 gap-5 mb-10 rounded-b ${className}`}>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Марка
                <input
                    type="text"
                    placeholder="Введите марку"
                    value={value.brand ?? ''}
                    onChange={(e) => onChange({ ...value, brand: e.target.value })}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Модель
                <input
                    type="text"
                    placeholder="Введите модель"
                    value={value.model ?? ''}
                    onChange={(e) => onChange({ ...value, model: e.target.value })}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Год
                <input
                    type="number"
                    placeholder="Введите год"
                    value={value.year ?? ''}
                    onChange={(e) => {
                        const v = e.target.value
                        onChange({ ...value, year: v === '' ? undefined : Number(v) })
                    }}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                Пробег
                <input
                    type="number"
                    placeholder="Введите пробег"
                    value={value.mileage ?? ''}
                    onChange={(e) => {
                        const v = e.target.value
                        onChange({ ...value, mileage: v === '' ? undefined : Number(v) })
                    }}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
        </div>
    )
}

export default AdsSortingAuto