import { Box, Flex, Text, Stack, HStack, Icon } from "@chakra-ui/react"
import { type Item } from "@/shared/types/items"
import ListCardImage from "./ListCardImage"
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Link } from "react-router-dom"

interface ListCardProps {
    itemData: Item
}

const fieldTranslations: Record<string, string> = {
    propertyType: 'Тип',
    area: 'Площадь',
    rooms: 'Комнат',
    price: 'Цена',
    brand: 'Марка',
    model: 'Модель',
    year: 'Год',
    mileage: 'Пробег',
    serviceType: 'Услуга',
    experience: 'Опыт',
    cost: 'Стоимость',
    workSchedule: 'График'
}

const formatValue = (key: string, value: unknown): string => {
    if (key === 'price' || key === 'cost') {
        return `${Number(value).toLocaleString('ru-RU')} ₽`
    }
    if (key === 'area') {
        return `${value} м²`
    }
    if (key === 'mileage') {
        return `${Number(value).toLocaleString('ru-RU')} км`
    }
    if (key === 'experience') {
        return `${value} лет`
    }
    return String(value)
}



const ListCard = (props: ListCardProps) => {
    const { id, name, description, location, image, ...uniqueFields } = props.itemData

    const displayFields = Object.entries(uniqueFields)
        .filter(([key]) => fieldTranslations[key])
        .slice(0, 4)

    const priceField = displayFields.find(([key]) => key === 'price' || key === 'cost')

    return (
        <Link to={`/item/${id}`} style={{ textDecoration: 'none' }}>
            <Flex
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                    borderColor: "border",
                    bg: "hoverCardBg",
                }}
                cursor="pointer"
                p="5"
                flexDirection={{ base: "column", md: "row" }}
            >
                {/* Image Section */}
                <Box
                    w={{ base: "full", md: "280px" }}
                    h={{ base: "200px", md: "full" }}
                    flexShrink={0}
                    overflow="hidden"
                >
                    <ListCardImage alt={name} image={image} />
                </Box>

                {/* Content Section */}
                <Flex
                    flex={1}
                    flexDirection="column"
                    px={5}
                    gap={3}
                    minW={0}
                >
                    {/* Header: Badge + Title */}
                    <Flex
                        justifyContent="space-between"
                        alignItems="flex-start"
                        gap={3}
                    >
                        <Box flex={1} minW={0}>
                            <Text
                                fontSize="lg"
                                fontWeight="600"
                                color="text"
                                lineClamp={2}
                                lineHeight="tight"
                            >
                                {name}
                            </Text>
                            {priceField && (
                            <Text
                                fontSize="xl"
                                fontWeight="700"
                                color="secondaryText"
                                whiteSpace="nowrap"
                            >
                                {formatValue(priceField[0], priceField[1])}
                            </Text>
                        )}
                        </Box>

                      
                    </Flex>

                    {/* Location */}
                    <HStack gap={1} color="mutedText">
                        <Icon fontSize="sm">
                            <LocationOnIcon sx={{ fontSize: 16 }} />
                        </Icon>
                        <Text fontSize="sm" lineClamp={1}>
                            {location}
                        </Text>
                    </HStack>

                    {/* Description */}
                    {description && (
                        <Text
                            fontSize="sm"
                            color="secondaryText"
                            lineClamp={2}
                            lineHeight="tall"
                        >
                            {description}
                        </Text>
                    )}

                    {/* Attributes */}
                    <HStack
                        gap={4}
                        mt="auto"
                        pt={2}
                        borderTopWidth="1px"
                        borderColor="accent"
                        flexWrap="wrap"
                    >
                        {displayFields
                            .filter(([key]) => key !== 'price' && key !== 'cost')
                            .map(([key, value]) => (
                                <Stack key={key} gap={0}>
                                    <Text
                                        fontSize="xs"
                                        color="fieldLabelColor"
                                        textTransform="uppercase"
                                        letterSpacing="wider"
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
                                </Stack>
                            ))}
                    </HStack>
                </Flex>
            </Flex>
        </Link>
    )
}

export default ListCard
