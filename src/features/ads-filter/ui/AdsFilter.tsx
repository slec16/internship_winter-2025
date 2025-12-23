import AutoFilter from "./AutoFilter"
import PropertyFilter from "./PropertyFilter"
import ServiceFilter from "./ServiceFilter"
import { Tabs, Text } from "@chakra-ui/react"
import HomeIcon from '@mui/icons-material/Home'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ServicesIcon from '@mui/icons-material/Build'
import { useQueryParams } from "@shared/lib/useQueryParams"
import { useEffect, useMemo } from "react"

const DEFAULT_FILTER_TYPE: 'auto' | 'property' | 'service' = 'auto'

const AdsFilter = () => {
    const { searchParams, setSearchParams } = useQueryParams()

    const filterTypeFromUrl = searchParams.get('filterType') as 'auto' | 'property' | 'service' | null
    
    const isValidFilterType = (value: string | null): value is 'auto' | 'property' | 'service' => {
        return value === 'auto' || value === 'property' || value === 'service'
    }

    const tabValue = useMemo(() => {
        if (isValidFilterType(filterTypeFromUrl)) {
            return filterTypeFromUrl
        }
        return DEFAULT_FILTER_TYPE
    }, [filterTypeFromUrl])

    useEffect(() => {
        if (!isValidFilterType(filterTypeFromUrl)) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev)
                params.set('filterType', DEFAULT_FILTER_TYPE)
                return params
            })
        }
    }, [filterTypeFromUrl, setSearchParams])

    const handleTabChange = (details: { value: string }) => {
        const value = details.value as 'auto' | 'property' | 'service'
        if (value === 'auto' || value === 'property' || value === 'service') {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev)
                params.set('filterType', value)
                
                params.delete('brand')
                params.delete('model')
                params.delete('yearFrom')
                params.delete('yearTo')
                
                params.delete('propertyTypes')
                params.delete('rooms')
                params.delete('areaFrom')
                params.delete('areaTo')
                
                params.delete('serviceType')
                params.delete('experience')
                params.delete('schedule')
                
                params.delete('priceFrom')
                params.delete('priceTo')
                
                return params
            })
        }
    }

    return (
        <>
            <Tabs.Root value={tabValue} unmountOnExit={true} onValueChange={handleTabChange} variant="plain" w="fit">
                <Tabs.List bg="tabsBg" rounded="l3" p="1" gap="1">
                    <Tabs.Trigger 
                        value="auto" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <DirectionsCarIcon sx={{ fontSize: 20 }}/>
                        <Text>Авто</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="property" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <HomeIcon sx={{ fontSize: 20 }}/>
                        <Text>Недвижимость</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="service" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <ServicesIcon sx={{ fontSize: 20 }}/>
                        <Text>Услуги</Text>
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" bg="tabsIndicator" boxShadow="sm" />
                </Tabs.List>
                <Tabs.Content value="auto">
                    <AutoFilter />
                </Tabs.Content>
                <Tabs.Content value="property">
                    <PropertyFilter />
                </Tabs.Content>
                <Tabs.Content value="service">
                    <ServiceFilter />
                </Tabs.Content>
            </Tabs.Root>
        </>
    )
}

export default AdsFilter