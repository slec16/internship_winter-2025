import { useState } from "react"
import type { MouseEvent as ReactMouseEvent } from "react"
import { useMediaQuery } from "@reactuses/core"
import { Box, Image, Text, Flex } from "@chakra-ui/react"
import { useTheme } from "@app/providers/theme/ThemeContext"

interface AdsCardImageProps {
    image?: string | string[]
    alt: string
}

const ListCardImage = ({ image, alt }: AdsCardImageProps) => {
    const images = Array.isArray(image) ? image : (image ? [image] : [])
    const hasMultipleImages = images.length > 1
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showExtraOverlay, setShowExtraOverlay] = useState(false)
    const indicatorCount = images.length > 4 ? 5 : images.length
    const activeIndicatorIndex = images.length > 4
        ? (showExtraOverlay ? 4 : Math.min(currentImageIndex, 3))
        : currentImageIndex

    const isWide = useMediaQuery("(min-width: 480px)")
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const containerBg = isDark ? "gray.600" : "gray.200"
    const placeholderBg = isDark ? "gray.600" : "gray.300"
    const placeholderColor = isDark ? "gray.300" : "gray.600"
    const activeIndicatorBg = isDark ? "gray.200" : "white"
    const inactiveIndicatorBg = isDark ? "rgba(160, 174, 192, 0.6)" : "rgba(255, 255, 255, 0.6)"

    const handleMouseEnter = () => { }

    const handleMouseLeave = () => {
        setShowExtraOverlay(false)
    }

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (images.length === 0) return

        const rect = e.currentTarget.getBoundingClientRect()
        const relativeX = e.clientX - rect.left
        const sectorCount = images.length > 4 ? 5 : images.length
        const sectorWidth = rect.width / sectorCount
        let sector = Math.floor(relativeX / sectorWidth)
        if (sector < 0) sector = 0
        if (sector > sectorCount - 1) sector = sectorCount - 1

        const hasExtra = images.length > 4

        if (hasExtra && sector === sectorCount - 1) {
            if (!showExtraOverlay) setShowExtraOverlay(true)
            return
        }

        if (showExtraOverlay) setShowExtraOverlay(false)

        const desiredIndex = Math.min(sector, images.length - 1)
        if (desiredIndex !== currentImageIndex) {
            setCurrentImageIndex(desiredIndex)
        }
    }

    return (
        <Box
            position="relative"
            onMouseEnter={isWide ? handleMouseEnter : undefined}
            onMouseLeave={isWide ? handleMouseLeave : undefined}
            onMouseMove={isWide ? handleMouseMove : undefined}
        >
            {images.length > 0 ? (
                <Box
                    w="full"
                    position="relative"
                    pt="100%"
                    borderRadius="xl"
                    overflow="hidden"
                    bg={containerBg}
                >
                    <Image
                        src={images[isWide ? currentImageIndex : 0]}
                        alt={alt}
                        position="absolute"
                        inset={0}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                    />
                </Box>
            ) : (
                <Box
                    w="full"
                    position="relative"
                    pt="100%"
                    borderRadius="xl"
                    overflow="hidden"
                    bg={placeholderBg}
                >
                    <Flex
                        position="absolute"
                        inset={0}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color={placeholderColor} fontSize="sm">
                            Нет фото
                        </Text>
                    </Flex>
                </Box>
            )}

            {isWide && hasMultipleImages && (
                <Flex
                    position="absolute"
                    bottom={2}
                    left="50%"
                    transform="translateX(-50%)"
                    gap={1.5}
                >
                    {Array.from({ length: indicatorCount }).map((_, i) => (
                        <Box
                            key={i}
                            h="6px"
                            borderRadius="full"
                            transition="all 0.2s"
                            w={i === activeIndicatorIndex ? 4 : 2}
                            bg={i === activeIndicatorIndex ? activeIndicatorBg : inactiveIndicatorBg}
                        />
                    ))}
                </Flex>
            )}

            {isWide && images.length > 4 && showExtraOverlay && (
                <Flex
                    position="absolute"
                    inset={0}
                    borderRadius="xl"
                    bg="rgba(0, 0, 0, 0.5)"
                    color="white"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                >
                    Еще {images.length - 4} фото
                </Flex>
            )}
        </Box>
    )
}

export default ListCardImage