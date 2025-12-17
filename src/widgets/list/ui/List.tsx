import ListCard from "./ListCard"
import { Stack } from "@chakra-ui/react"

interface ListProps {
    data: any[]
}

const List = (props: ListProps) => {

    const { data } = props

    console.log(data)

    return(
        <Stack direction="column">
            {data.map((item) => (
                <ListCard key={item.id} />
            ))}
        </Stack>
    )
}

export default List