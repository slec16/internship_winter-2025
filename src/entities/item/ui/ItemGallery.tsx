import { useState } from "react"
import {
    Box,
    Image,
    Carousel,
    IconButton,
    Dialog,
    Text,
    Center,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuImageOff } from "react-icons/lu"

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
                    width="full"
                    alignItems="stretch"
                    minH="400px"
                >
                    <Carousel.PrevTrigger asChild>
                        <Box>
                            <IconButton
                                size="xs"
                                height="100%"
                                variant="ghost"
                                roundedRight="none"
                                aria-label="Предыдущее фото"
                                _hover={{
                                    bg: "bgGalleryButtonHover",
                                    color: "colorGalleryButtonHover"
                                }}
                            >
                                <LuChevronLeft />
                            </IconButton>
                        </Box>
                    </Carousel.PrevTrigger>

                    <Carousel.ItemGroup width="full" alignItems="center">
                        {images.map((url, index) => (
                            <Carousel.Item key={`${url}-${index}`} index={index}>
                                {url.length === 0 ? (
                                    <Center
                                        w="100%"
                                        minH="400px"
                                        bg="gray.50"
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        flexDirection="column"
                                        gap={3}
                                        p={6}
                                    >
                                        <Box
                                            fontSize="4xl"
                                            color="gray.400"
                                        >
                                            <LuImageOff />
                                        </Box>
                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                            fontWeight="medium"
                                        >
                                            Нет фото
                                        </Text>
                                    </Center>
                                ) : (
                                    <Box
                                        w="100%"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        position="relative"
                                        minH="400px"
                                        bgSize="cover"
                                        style={{
                                            backgroundImage: `url(${url})`
                                        }}
                                    >
                                        <Box
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            width="100%"
                                            height="100%"
                                            backdropFilter="blur(30px)"
                                            bg="blackAlpha.100"
                                        />

                                        <Box
                                            position="relative"
                                            zIndex="1"
                                            maxH="400px"
                                            maxW="100%"
                                            cursor="pointer"
                                            onClick={() => setPreviewUrl(url)}
                                        >
                                            <Image
                                                src={url}
                                                alt={name}
                                                objectFit="contain"
                                                width="auto"
                                                height="auto"
                                                maxH="400px"
                                                maxW="100%"
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>

                    <Carousel.NextTrigger asChild>
                        <Box>
                            <IconButton
                                size="xs"
                                variant="ghost"
                                roundedLeft="none"
                                aria-label="Следующее фото"
                                h="100%"
                                _hover={{
                                    bg: "bgGalleryButtonHover",
                                    color: "colorGalleryButtonHover"
                                }}
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
                            key={`thumb-${url}-${index}`}
                            index={index}
                            unstyled
                            flexShrink={0}
                            _current={{
                                outline: "2px solid currentColor",
                                outlineOffset: "2px",
                            }}
                        >
                            {url.length === 0 ? (
                                <Center
                                    w="20"
                                    aspectRatio="16/9"
                                    bg="gray.100"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    borderRadius="sm"
                                    flexDirection="column"
                                    gap={1}
                                >
                                    <Box
                                        fontSize="lg"
                                        color="gray.400"
                                    >
                                        <LuImageOff />
                                    </Box>
                                    <Text
                                        fontSize="xs"
                                        color="gray.500"
                                        px={1}
                                    >
                                        Нет фото
                                    </Text>
                                </Center>
                            ) : (
                                <Image
                                    w="20"
                                    aspectRatio="16/9"
                                    src={url}
                                    alt={name}
                                    objectFit="cover"
                                />
                            )}
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
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minH="100vh"
                    >
                        <Dialog.Content
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mx="auto"
                            p="0"
                            bg="transparent"
                            boxShadow="none"
                        >
                            <Dialog.CloseTrigger
                                position="absolute"
                                top="2"
                                right="2"
                                zIndex="10"
                                color="white"
                                bg="blackAlpha.600"
                                _hover={{ bg: "blackAlpha.800" }}
                            />
                            {previewUrl && (
                                <Image
                                    src={previewUrl}
                                    alt={name}
                                    maxW="100%"
                                    maxH="100%"
                                    objectFit="contain"
                                    borderRadius="lg"
                                />
                            )}
                        </Dialog.Content>
                    </Box>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    )
}

export default ItemGallery