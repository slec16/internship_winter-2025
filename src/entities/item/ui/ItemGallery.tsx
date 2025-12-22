import { useState } from "react"
import {
    Box,
    Image,
    Carousel,
    IconButton,
    Dialog,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface ItemGalleryProps {
    images: string[],
    name: string
}

const ItemGallery = (props: ItemGalleryProps) => {

    const { images, name } = props

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    return (
        <>
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

export default ItemGallery