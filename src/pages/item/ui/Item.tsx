import { useParams } from "react-router-dom"
import {
    Box,
    Text,
    
} from "@chakra-ui/react"
import ItemDetails from "@/widgets/item-details"
import { useGetItemByIdQuery } from "@shared/api/itemsApi"

const Item = () => {
    const { id } = useParams()
    const { data: item, isError, isLoading } = useGetItemByIdQuery(Number(id))

    if (isLoading) {
        return (
            <Box px="10">
                <Text>Загрузка...</Text>
            </Box>
        )
    }

    if (isError || !item) {
        return (
            <Box px="10">
                <Text>Не удалось загрузить объявление.</Text>
            </Box>
        )
    }

    return (
        <>
            <Box px="10">
                <ItemDetails item={item} />
            </Box>

        </>
    )
}

export default Item