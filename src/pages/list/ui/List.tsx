import AdsList from "@widgets/list"
import { AdsFilter } from "@/features/ads-filter"
import Search from "@/features/ads-search"
import { useGetItemsQuery } from "@shared/api/itemsApi"
import { Box, Flex } from "@chakra-ui/react"

const List = () => {

    const { data, error, isLoading } = useGetItemsQuery()


    // console.log(data, error, isLoading)



    if (error) return <p>Возникла ошибка</p>
    return (
        <>
            <Flex direction="row" gapX="5">
                <Box w="1/3">
                    <AdsFilter />
                </Box>
                <Box w="full">
                    <Search />
                    {data && <AdsList 
                        data={data}
                    />}
                    
                </Box>
            </Flex>
        </>

    )
}

export default List