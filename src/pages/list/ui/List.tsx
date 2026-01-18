import AdsList from "@widgets/list"
import { AdsFilter } from "@/features/ads-filter"
import Search from "@/features/ads-search"
import { useGetItemsQuery } from "@shared/api/itemsApi"
import { Box, Flex } from "@chakra-ui/react"
import { useQueryParams } from "@shared/lib/useQueryParams"
import { useMemo } from "react"
import { filterItemsByType } from "@/features/ads-filter/lib/filterByType"
import { filterByAutoParams } from "@/features/ads-filter/lib/filterByAutoParams"
import { filterByPropertyParams } from "@/features/ads-filter/lib/filterByPropertyParams"
import { filterByServiceParams } from "@/features/ads-filter/lib/filterByServiceParams"
import { filterBySearchParams } from "@/features/ads-search/lib/filterBySearchParams"

const List = () => {
    const { searchParams } = useQueryParams()
    const { data, error, isLoading } = useGetItemsQuery()

    const filteredData = useMemo(() => {
        if (!data) return []

        const filterType = searchParams.get('filterType')
        let result = filterItemsByType(data, filterType)

        result = filterByAutoParams(result, searchParams)
        result = filterByPropertyParams(result, searchParams)
        result = filterByServiceParams(result, searchParams)
        result = filterBySearchParams(result, searchParams)

        return result
    }, [data, searchParams])

    if (error) return <p>Возникла ошибка</p>
    if (isLoading) return <p>Загрузка...</p>
    return (
        <>
            <Flex direction="row" gapX="5">
                <Box w="1/3">
                    <AdsFilter />
                </Box>
                <Box w="full">
                    <Search />
                    {filteredData && <AdsList 
                        data={filteredData}
                    />}
                    
                </Box>
            </Flex>
        </>

    )
}

export default List