import {
    Flex,
    Heading,
    Text,
    FormatNumber
} from "@chakra-ui/react"

interface ItemHeaderProps {
    name: string
    price: number
}

const ItemHeader = (props: ItemHeaderProps) => {

    const { name, price } = props

    return (
        <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
            <Heading
                size="3xl"
            >
                {name}
            </Heading >
            {price ? 
            <Text textStyle="3xl">
                <FormatNumber value={price} style="currency" currency="RUB" />
            </Text>
            :
            <Text textStyle="xl">Цена не указана</Text>
            }
        </Flex>
    )
}

export default ItemHeader