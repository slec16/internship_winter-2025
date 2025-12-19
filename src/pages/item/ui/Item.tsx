import { useState } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Text,
    Image,
    IconButton,
    Carousel,
    Dialog,
    Flex,
    Heading,
    FormatNumber,
    VStack,
    Button,
    Breadcrumb
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
    console.log(uniqueFields)
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
                <VStack gap='2'>
                    <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
                        <Heading
                            size="3xl"
                        >
                            {name}
                        </Heading >
                        <Text textStyle="3xl">
                            <FormatNumber value={item.price} style="currency" currency="RUB" />
                        </Text>
                    </Flex>
                    <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
                        <Breadcrumb.Root>
                            <Breadcrumb.List>
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Главная</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">{uniqueFields.type}</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>{name}</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                        <Button bg="green" opacity="80%">Редактировать</Button>
                    </Flex>
                </VStack>
                {images.length > 0 && (
                    <Carousel.Root
                        slideCount={images.length}
                        maxW="2xl"
                        gap="4"
                        mb={4}
                    >
                        <Carousel.Control
                            justifyContent="center"
                            // gap="4"
                            width="full"
                            alignItems="stretch"
                            minH="400px"
                        >
                            <Carousel.PrevTrigger asChild>
                                <Box>
                                    <IconButton
                                        size="xs"
                                        height="100%"
                                        variant="outline"
                                        aria-label="Предыдущее фото"
                                    >
                                        <LuChevronLeft />
                                    </IconButton>
                                </Box>
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
                                <Box>
                                    <IconButton
                                        size="xs"
                                        variant="outline"
                                        aria-label="Следующее фото"
                                        h="100%"
                                    >
                                        <LuChevronRight />
                                    </IconButton>
                                </Box>
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