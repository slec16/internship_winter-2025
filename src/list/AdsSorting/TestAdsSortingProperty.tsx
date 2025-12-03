import SquareFootIcon from '@mui/icons-material/SquareFoot'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import { useState } from 'react'
import FilterPopover from '../../components/FilterPopover'
import { Button } from '@mui/material'

const TestAdsSortingProperty = ({ className }: { className: string }) => {

    const [openId, setOpenId] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const makeOnOpen = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenId(id)
        setAnchorEl(e.currentTarget)
    }
    const onClose = () => {
        setOpenId(null)
        setAnchorEl(null)
    }

    const [area, setArea] = useState<[string, string]>(['', ''])
    const [rooms, setRooms] = useState<string[]>([])
    const [propertyTypes, setPropertyTypes] = useState<string[]>([])
    const [price, setPrice] = useState<[string, string]>(['', ''])


    return (
        <div className={`flex flex-row flex-wrap justify-between py-5 px-3 gap-5 mb-10 rounded-b-3xl  ${className}`}>
            <FilterPopover
                id="propertyType"
                placeholder="Тип недвижимости"
                icon={<BedroomParentIcon className="text-gray-700 dark:text-gray-200" />}
                type="button"
                value={propertyTypes}
                isOpen={openId === 'propertyType'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('propertyType')}
                onClose={onClose}
            >
                <div className="flex flex-row flex-wrap gap-2 max-w-[90vw] sm:max-w-none">
                    {['Квартира', 'Дом', 'Студия', 'Таунхаус'].map((propertyType: string) => (
                        <button
                            key={propertyType}
                            type="button"
                            aria-pressed={propertyTypes.includes(propertyType)}
                            onClick={() =>
                                setPropertyTypes(
                                    propertyTypes.includes(propertyType)
                                        ? propertyTypes.filter(r => r !== propertyType)
                                        : [...propertyTypes, propertyType]
                                )
                            }
                            className="px-3 py-1 rounded border text-sm transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 aria-pressed:bg-blue-600 aria-pressed:text-white aria-pressed:border-blue-600 aria-pressed:hover:bg-blue-700"
                        >
                            {propertyType}
                        </button>
                    ))}
                </div>
            </FilterPopover>
            <FilterPopover
                id="area"
                placeholder="Площадь"
                icon={<SquareFootIcon className="text-gray-700 dark:text-gray-200" />}
                type="range"
                value={area}
                isOpen={openId === 'area'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('area')}
                onClose={onClose}
            >
                <span className="text-sm text-gray-700 dark:text-gray-200">от</span>
                <input
                    type="number"
                    placeholder="Площадь"
                    value={area[0] ?? ''}
                    onChange={(e) => setArea([e.target.value ?? '', area[1] ?? ''])}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">до</span>
                <input
                    type="number"
                    placeholder="Площадь"
                    value={area[1] ?? ''}
                    onChange={(e) => setArea([area[0] ?? '', e.target.value ?? ''])}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
            </FilterPopover>
            <FilterPopover
                id="rooms"
                placeholder="Комнаты"
                icon={<BedroomParentIcon className="text-gray-700 dark:text-gray-200" />}
                type="button"
                value={rooms}
                isOpen={openId === 'rooms'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('rooms')}
                onClose={onClose}
            >
                <div className="flex flex-row flex-wrap gap-2 max-w-[90vw] sm:max-w-none">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((roomNumber: number) => (
                        <button
                            key={roomNumber}
                            type="button"
                            aria-pressed={rooms.includes(roomNumber.toString())}
                            onClick={() =>
                                setRooms(
                                    rooms.includes(roomNumber.toString())
                                        ? rooms.filter(r => r !== roomNumber.toString())
                                        : [...rooms, roomNumber.toString()]
                                )
                            }
                            className="px-3 py-1 rounded border text-sm transition-colors bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 aria-pressed:bg-blue-600 aria-pressed:text-white aria-pressed:border-blue-600 aria-pressed:hover:bg-blue-700"
                        >
                            {roomNumber} комната
                        </button>
                    ))}
                </div>
            </FilterPopover>
            <FilterPopover
                id="price"
                placeholder="Цена"
                icon={<SquareFootIcon className="text-gray-700 dark:text-gray-200" />}
                type="range"
                value={price}
                isOpen={openId === 'price'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('price')}
                onClose={onClose}
            >
                <span className="text-sm text-gray-700 dark:text-gray-200">от</span>
                <input
                    type="number"
                    placeholder="Цена"
                    value={price[0] ?? ''}
                    onChange={(e) => setPrice([e.target.value ?? '', price[1] ?? ''])}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">до</span>
                <input
                    type="number"
                    placeholder="Цена"
                    value={price[1] ?? ''}
                    onChange={(e) => setPrice([price[0] ?? '', e.target.value ?? ''])}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
            </FilterPopover>
            <Button variant="contained" color="primary" onClick={() => {
                console.log(propertyTypes, area, rooms, price)
            }}>
                Применить
            </Button>
        </div>
    )
}

export default TestAdsSortingProperty