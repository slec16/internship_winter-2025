import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'
import AdsCard from "./AdsCard"
import type { Item, ItemType } from "../types/items"
import type { AutoFilters, PropertyFilters, ServiceFilters } from "../types/filters"
import { AdsSortingAuto, AdsSortingProperty, AdsSortingService, TestAdsSortingProperty } from "./AdsSorting"
import HomeIcon from '@mui/icons-material/Home'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ServicesIcon from '@mui/icons-material/Build'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

interface HeaderBlockConfig {
    icon: ReactElement
    class: string
}

const AdsList = ({ adsList }: { adsList: Item[] }) => {

    const headerBlocks: Record<ItemType, HeaderBlockConfig> = {
        'Недвижимость': {
            icon: <HomeIcon sx={{ color: '#166534' }} />,
            class: 'bg-[#F2F1F0] dark:bg-slate-800',
        },
        'Авто': {
            icon: <DirectionsCarIcon sx={{ color: '#1e40af' }} />,
            class: 'bg-[#F2F1F0] dark:bg-slate-800',
        },
        'Услуги': {
            icon: <ServicesIcon sx={{ color: '#7e22ce' }} />,
            class: 'bg-[#F2F1F0] dark:bg-slate-800',
        },
    }

    // TODO: active tab to query param
    const [activeTab, setActiveTab] = useState<ItemType | 'Все'>('Все')
    const [autoFilters, setAutoFilters] = useState<AutoFilters>({})
    const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({})
    const [serviceFilters, setServiceFilters] = useState<ServiceFilters>({})
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filteredAds = useMemo(() => {
        const base = activeTab === 'Все' ? adsList : adsList.filter((ad) => ad.type === activeTab)
        let filtered = base
        if (activeTab === 'Авто') {
            filtered = base.filter((ad) => {
                if (ad.type !== 'Авто') return false
                const f = autoFilters
                const brandOk = !f.brand || ad.brand.toLowerCase().includes(f.brand.toLowerCase())
                const modelOk = !f.model || ad.model.toLowerCase().includes(f.model.toLowerCase())
                const yearOk = f.year === undefined || ad.year >= f.year
                const mileageOk = f.mileage === undefined || (ad.mileage !== undefined && ad.mileage <= f.mileage)
                return brandOk && modelOk && yearOk && mileageOk
            })
        }
        if (activeTab === 'Недвижимость') {
            filtered = base.filter((ad) => {
                if (ad.type !== 'Недвижимость') return false
                const f = propertyFilters
                const typeOk = !f.propertyType || ad.propertyType.toLowerCase().includes(f.propertyType.toLowerCase())
                const areaOk = f.area === undefined || ad.area >= f.area
                const roomsOk = f.rooms === undefined || ad.rooms >= f.rooms
                const priceOk = f.price === undefined || ad.price <= f.price
                return typeOk && areaOk && roomsOk && priceOk
            })
        }
        if (activeTab === 'Услуги') {
            filtered = base.filter((ad) => {
                if (ad.type !== 'Услуги') return false
                const f = serviceFilters
                const typeOk = !f.serviceType || ad.serviceType.toLowerCase().includes(f.serviceType.toLowerCase())
                const expOk = f.experience === undefined || ad.experience >= f.experience
                const costOk = f.cost === undefined || ad.cost <= f.cost
                const schedOk = !f.workSchedule || (ad.workSchedule ?? '').toLowerCase().includes(f.workSchedule.toLowerCase())
                return typeOk && expOk && costOk && schedOk
            })
        }
        // Фильтрация по названию
        if (searchQuery.trim()) {
            filtered = filtered.filter((ad) => 
                ad.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
            )
        }
        return filtered
    }, [adsList, activeTab, autoFilters, propertyFilters, serviceFilters, searchQuery])

    return (
        <div className="container mx-auto px-2 py-4">
            {adsList.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg">Объявлений пока нет</p>
                </div>
            )}
            <div className="flex flex-row flex-wrap justify-start gap-2" role="tablist" aria-label="Категории">
                {Object.keys(headerBlocks).map((item) => {
                    const key = item as ItemType
                    const isActive = activeTab === key
                    return (
                        <button
                            key={item}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveTab(prev => prev === key ? 'Все' : key)}
                            className={`flex flex-row items-center gap-2 rounded-3xl px-4 py-4 shadow-x aria-selected:rounded-b-none ${isActive ? headerBlocks[key].class : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            {headerBlocks[key].icon}
                            <h2 className="text-sm font-bold">{item}</h2>
                        </button>
                    )
                })}
                <div className={`flex flex-row items-center flex-1 px-2 py-2 sm:py-0 bg-[#F2F1F0] dark:bg-slate-800 rounded-3xl ${activeTab !== 'Все' && 'rounded-b-none'}`}>
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск по названию..."
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setSearchQuery('')}
                                            edge="end"
                                            size="small"
                                            sx={{ padding: '4px' }}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                    />      
                </div>
            </div>

            {activeTab === 'Авто' && <AdsSortingAuto className={headerBlocks[activeTab].class} value={autoFilters} onChange={setAutoFilters} />}
            {/* {activeTab === 'Недвижимость' && <AdsSortingProperty className={headerBlocks[activeTab].class} value={propertyFilters} onChange={setPropertyFilters} />} */}
            {activeTab === 'Недвижимость' && <TestAdsSortingProperty className={headerBlocks[activeTab].class} />}
            {activeTab === 'Услуги' && <AdsSortingService className={headerBlocks[activeTab].class} value={serviceFilters} onChange={setServiceFilters} />}
            {activeTab === 'Все' && <div className="h-10" />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredAds && filteredAds.map(ads => {
                    return (
                        <AdsCard key={ads.id ?? ads.name} item={ads} />
                    )
                })}
            </div>
        </div>
    )
}

export default AdsList