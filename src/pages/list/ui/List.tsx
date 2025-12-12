import { useGetItemsQuery } from "@shared/api/itemsApi"
import AdsList from "@widgets/ads-list"
import LoadingSpinner from "@shared/ui/LoadingSpinner"
import { AdsFilter } from "@/features/ads-filter"
import { Box, Flex, Input } from "@chakra-ui/react"
import SearchIcon from '@mui/icons-material/Search'

const List = () => {

    const { data, error, isLoading } = useGetItemsQuery()


    // console.log(data, error, isLoading)



    // if (isLoading) return <div className="items-center flex justify-center"><LoadingSpinner /></div>
    if (error) return <p>Возникла ошибка</p>
    return (
        <>
            <Flex direction="row" gapX="5">
                <Box>
                    <AdsFilter />
                </Box>
                <Box w="full">
                    <Input
                        placeholder="Поиск..."
                    />
                    <div>here list</div>
                </Box>
            </Flex>
        </>

    )
}

export default List