import { useState } from 'react'
import type { PropertyFilters } from '../../types/filters'
import Popover from '@mui/material/Popover'

const AdsSortingProperty = ({ className, value, onChange }: { className: string, value: PropertyFilters, onChange: (next: PropertyFilters) => void }) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined


    return (
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
            <button aria-describedby={id} onClick={handleClick} className='hover:bg-gray-200 dark:hover:bg-slate-900 p-2 rounded-md'>
                <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-200">
                    Площадь
                    <input
                        className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                    />
                </label>
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        marginTop: '0px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }
                }}
            >
                <div className='p-3 flex flex-row items-center gap-2 bg-white dark:bg-gray-900'>
                    <span className="text-sm text-gray-700 dark:text-gray-200">от</span>
                    <input className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">до</span>
                    <input className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800" />
                </div>
            </Popover>
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