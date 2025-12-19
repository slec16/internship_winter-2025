import { useState } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Text,
    Image,
    IconButton,
    Carousel,
    Dialog,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { useGetItemByIdQuery } from "@shared/api/itemsApi"

const fieldTranslations: Record<string, string> = {
    propertyType: "Тип",
    area: "Площадь",
    rooms: "Комнат",
    price: "Цена",
    brand: "Марка",
    model: "Модель",
    year: "Год",
    mileage: "Пробег",
    serviceType: "Услуга",
    experience: "Опыт",
    cost: "Стоимость",
    workSchedule: "График",
}

const formatValue = (key: string, value: unknown): string => {
    if (key === "price" || key === "cost") {
        return `${Number(value).toLocaleString("ru-RU")} ₽`
    }
    if (key === "area") {
        return `${value} м²`
    }
    if (key === "mileage") {
        return `${Number(value).toLocaleString("ru-RU")} км`
    }
    if (key === "experience") {
        return `${value} лет`
    }
    return String(value)
}

const Item = () => {
    const { id } = useParams()
    const { data: item, isError, isLoading } = useGetItemByIdQuery(Number(id))
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

    const { name, image, ...uniqueFields } = item

    const displayFields = Object.entries(uniqueFields).filter(
        ([key]) => fieldTranslations[key],
    )

    let images = Array.isArray(image)
        ? image
        : image
            ? [image]
            : []

    images = [...images, ...images, ...images]

    return (
        <>
            <Box px="10">
                {images.length > 0 && (
                    <Carousel.Root
                        slideCount={images.length}
                        maxW="2xl"
                        gap="4"
                        mb={4}
                    >
                        <Carousel.Control justifyContent="center" gap="4" width="full">
                            <Carousel.PrevTrigger asChild>
                                <IconButton size="xs" variant="outline" aria-label="Предыдущее фото">
                                    <LuChevronLeft />
                                </IconButton>
                            </Carousel.PrevTrigger>

                            <Carousel.ItemGroup width="full" alignItems="center">
                                {images.map((url, index) => (
                                    <Carousel.Item key={url} index={index}>
                                        <Box w="100%" display="flex" justifyContent="center" borderWidth={"2px"}>
                                            <Image
                                                src={url}
                                                alt={name}
                                                maxH="400px"
                                                maxW="100%"
                                                objectFit="contain"
                                                cursor="pointer"
                                                onClick={() => setPreviewUrl(url)}
                                            />
                                        </Box>
                                    </Carousel.Item>
                                ))}
                            </Carousel.ItemGroup>

                            <Carousel.NextTrigger asChild>
                                <IconButton size="xs" variant="outline" aria-label="Следующее фото">
                                    <LuChevronRight />
                                </IconButton>
                            </Carousel.NextTrigger>
                        </Carousel.Control>

                        <Carousel.IndicatorGroup
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="start"
                            gap={2}
                            mt={3}
                            px="3"
                        >
                            {images.map((url, index) => (
                                <Carousel.Indicator
                                    key={url}
                                    index={index}
                                    unstyled
                                    flexShrink={0}
                                    _current={{
                                        outline: "2px solid currentColor",
                                        outlineOffset: "2px",
                                    }}
                                >
                                    <Image
                                        w="20"
                                        aspectRatio="16/9"
                                        src={url}
                                        alt={name}
                                        objectFit="cover"
                                    />
                                </Carousel.Indicator>
                            ))}
                        </Carousel.IndicatorGroup>
                </Carousel.Root>
            )}

                <Text
                    fontSize="lg"
                    fontWeight="600"
                    mb={2}
                >
                    {name}
                </Text>

                {displayFields.map(([key, value]) => (
                    <Text key={key}>
                        {fieldTranslations[key]}: {formatValue(key, value)}
                    </Text>
                ))}
            </Box>

            <Dialog.Root
                open={Boolean(previewUrl)}
                onOpenChange={(details) => {
                    if (!details.open) {
                        setPreviewUrl(null)
                    }
                }}
            >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger />
                        {previewUrl && (
                            <Image
                                src={previewUrl}
                                alt={name}
                                // maxW="90vw"
                                // maxH="80vh"
                                objectFit="contain"
                            />
                        )}
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    )
}

export default Item