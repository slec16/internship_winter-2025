import {
    Text,
    HStack,
    VStack,
    Icon,
    Box,
    Flex,
} from "@chakra-ui/react"
import { LuMapPin } from "react-icons/lu"
import { fieldTranslations } from "../lib/field-translation"
import { formatValue } from "../lib/format-value"

interface ItemAttributesProps {
    description: string,
    location: string
    displayFields: [string, string | number][]
}

const ItemAttributes = (props: ItemAttributesProps) => {
    const { description, location, displayFields } = props

    return (
        <VStack align="stretch" gap={6} mt={4} w={{ base: "100%", md: "50%" }}>
            {location && (
                <Box>
                    <HStack gap={1} alignItems="center">
                        <Icon fontSize="sm">
                            <LuMapPin />
                        </Icon>
                        <Text
                            fontSize="lg"
                            fontWeight="700"
                            color="text"
                        >
                            Локация
                        </Text>
                    </HStack>
                    <Text
                        fontSize="md"
                        color="secondaryText"
                        lineHeight="tall"
                    >
                        {location}
                    </Text>
                </Box>
            )}

            {description && (
                <Box>
                    <Text
                        fontSize="lg"
                        fontWeight="700"
                        color="text"
                    >
                        Описание
                    </Text>
                    <Text
                        fontSize="md"
                        color="secondaryText"
                        lineHeight="tall"
                    >
                        {description}
                    </Text>
                </Box>
            )}

            {displayFields.length > 0 && (
                <Box>
                    <Text
                        fontSize="lg"
                        fontWeight="700"
                        color="text"
                    >
                        Характеристики
                    </Text>
                    <VStack align="stretch" gap={0}>
                        {displayFields.map(([key, value]) => (
                            <Flex
                                key={key}
                                justifyContent="space-between"
                                alignItems="center"
                                pb={2}
                            >
                                <Text
                                    fontSize="sm"
                                    color="fieldLabelColor"
                                >
                                    {fieldTranslations[key]}
                                </Text>
                                <Text
                                    fontSize="sm"
                                    fontWeight="500"
                                    color="fieldValueColor"
                                >
                                    {formatValue(key, value)}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </Box>
            )}
        </VStack>
    )
}

export default ItemAttributes