import ListCard from "./ListCard"
import { Stack } from "@chakra-ui/react"
import { type Item } from "@/shared/types/items"

interface ListProps {
    data: Item[]
}

const List = (props: ListProps) => {

    const { data } = props


    return(
        <Stack direction="column" w="full">
            {data.map((item) => (
                <ListCard key={item.id} itemData={item}/>
            ))}
        </Stack>
    )
}

export default List