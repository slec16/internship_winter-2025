import {
    Text,
    HStack,
    VStack,
    Icon,
    Box,
    Flex,
} from "@chakra-ui/react"
import LocationOnIcon from '@mui/icons-material/LocationOn'
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
            <Text
                fontSize="md"
                fontWeight="600"
                color="text"
                mb={2}
            >
                Локация
            </Text>
            {/* Локация */}
            <HStack gap={1} color="mutedText">
                <Icon fontSize="sm">
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                </Icon>
                <Text fontSize="sm">
                    {location}
                </Text>
            </HStack>

            {/* Описание */}
            {description && (
                <Box>
                    <Text
                        fontSize="md"
                        fontWeight="600"
                        color="text"
                        mb={2}
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

            {/* Характеристики */}
            {displayFields.length > 0 && (
                <Box>
                    <Text
                        fontSize="md"
                        fontWeight="600"
                        color="text"
                        mb={3}
                    >
                        Характеристики
                    </Text>
                    <VStack align="stretch" gap={0}>
                        {displayFields.map(([key, value]) => (
                            <Flex
                                key={key}
                                justifyContent="space-between"
                                alignItems="center"
                                py={2}
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