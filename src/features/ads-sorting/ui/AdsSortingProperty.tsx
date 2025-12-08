import { useState } from 'react'
import type { ReactNode } from 'react'
import type { PropertyFilters } from '@shared/types/filters'
import Menu from '@mui/material/Menu'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import HomeIcon from '@mui/icons-material/Home'
import { Button, ClickAwayListener } from '@mui/material'

type RangeFilterButtonProps = {
    id: string
    unit: string
    placeholder: string
    onFromChange: (n: number | undefined) => void
    icon?: ReactNode
    open: boolean
    anchorEl: HTMLElement | null
    onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
    onClose: () => void
}

const RangeFilterButton = ({ id, unit, placeholder, onFromChange, icon, open: isOpen, anchorEl, onOpen, onClose }: RangeFilterButtonProps) => {

    const [from, setFrom] = useState<string>('')
    const [to, setTo] = useState<string>('')

    const menuId = isOpen ? `${id}-menu` : undefined
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isOpen) {
            onClose()
        } else {
            onOpen(event)
        }
    }
    const handleClose = () => onClose()

    const handleClickAway = () => {
        if (!isOpen) return
        onClose()
    }

    const display = (from || to)
        ? [from ? `от ${from}` : '', to ? `до ${to}` : ''].filter(Boolean).join(' ').trim()
        : ''

    return (
        <>
            <button
                aria-controls={menuId}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={handleClick}
                className='hover:bg-gray-200 border border-transparent dark:hover:bg-slate-900 p-2 aria-expanded:border-gray-700 rounded-md'
            >
                <label className="flex flex-row items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                    {icon ?? <span className="text-sm text-gray-700 dark:text-gray-200">{unit}</span>}
                    <input
                        placeholder={placeholder}
                        value={display}
                        readOnly
                        className="w-48 rounded-md bg-transparent px-3 text-gray-900 placeholder-gray-400 outline-none border-0 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                    />
                </label>
            </button>
            <Menu
                id={menuId}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    root: {
                        style: { pointerEvents: 'none' }, // отключаем бэкдроп клики
                    },
                    paper: {
                        sx: {
                            pointerEvents: 'auto', // контент меню интерактивен
                            mt: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 8px 18px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.12)',
                            '.dark &': {
                                boxShadow: '0 14px 28px rgba(0,0,0,0.7), 0 6px 14px rgba(0,0,0,0.6)',
                            },
                        },
                    },
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway} >
                    <div className='p-5 flex flex-row items-center gap-2 bg-white dark:bg-gray-900'>
                        <span className="text-sm text-gray-700 dark:text-gray-200">от</span>
                        <input
                            type="number"
                            placeholder={unit}
                            value={from}
                            onChange={(e) => {
                                const v = e.target.value
                                setFrom(v)
                                const n = v === '' ? undefined : Number(v)
                                onFromChange(n)
                            }}
                            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">до</span>
                        <input
                            type="number"
                            placeholder={unit}
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                        />
                    </div>
                </ClickAwayListener>
            </Menu>
        </>
    )
}

const AdsSortingProperty = ({ className, value, onChange }: { className: string, value: PropertyFilters, onChange: (next: PropertyFilters) => void }) => {




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

    return (
        <div className={`flex flex-row flex-wrap justify-between py-5 px-3 gap-5 mb-10 rounded-b ${className}`}>
            <label className="flex flex-row items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                <HomeIcon fontSize="small" className="text-gray-700 dark:text-gray-200" />
                <input
                    type="text"
                    placeholder="Введите тип недвижимости"
                    value={value.propertyType ?? ''}
                    onChange={(e) => onChange({ ...value, propertyType: e.target.value })}
                    className="mt-1 w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                />
            </label>
            <RangeFilterButton
                id="area"
                unit="м²"
                placeholder="Площадь"
                icon={<SquareFootIcon fontSize="small" className="text-gray-700 dark:text-gray-200" />}
                onFromChange={(n) => onChange({ ...value, area: n })}
                open={openId === 'area'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('area')}
                onClose={onClose}
            />
            <RangeFilterButton
                id="rooms"
                unit="комн."
                placeholder="Комнаты"
                icon={<BedroomParentIcon fontSize="small" className="text-gray-700 dark:text-gray-200" />}
                onFromChange={(n) => onChange({ ...value, rooms: n })}
                open={openId === 'rooms'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('rooms')}
                onClose={onClose}
            />
            <RangeFilterButton
                id="price"
                unit="₽"
                placeholder="Цена"
                icon={<CurrencyRubleIcon fontSize="small" className="text-gray-700 dark:text-gray-200" />}
                onFromChange={(n) => onChange({ ...value, price: n })}
                open={openId === 'price'}
                anchorEl={anchorEl}
                onOpen={makeOnOpen('price')}
                onClose={onClose}
            />
            <Button variant="contained" color="primary">
                Применить
            </Button>
        </div>
    )
}

export default AdsSortingProperty