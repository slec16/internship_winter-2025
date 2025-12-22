import {
    Text,
} from "@chakra-ui/react"
import { fieldTranslations } from "../lib/field-translation"
import { formatValue } from "../lib/format-value"

interface ItemAttributesProps {
    displayFields: [string, string | number][]
}

const ItemAttributes = (props: ItemAttributesProps) => {

    const { displayFields } = props

    return(
        <>
            {displayFields.map(([key, value]) => (
                <Text key={key}>
                    {fieldTranslations[key]}: {formatValue(key, value)}
                </Text>
            ))}
        </>
    )
}

export default ItemAttributes