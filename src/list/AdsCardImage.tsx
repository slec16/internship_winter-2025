import { useState } from "react"
import type { MouseEvent as ReactMouseEvent } from "react"
import { useMediaQuery } from "@reactuses/core"

interface AdsCardImageProps {
    image?: string | string[]
    alt: string
}

const AdsCardImage = ({ image, alt }: AdsCardImageProps) => {
    const images = Array.isArray(image) ? image : (image ? [image] : [])
    const hasMultipleImages = images.length > 1
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showExtraOverlay, setShowExtraOverlay] = useState(false)
    const indicatorCount = images.length > 4 ? 5 : images.length
    const activeIndicatorIndex = images.length > 4
        ? (showExtraOverlay ? 4 : Math.min(currentImageIndex, 3))
        : currentImageIndex

    const isWide = useMediaQuery("(min-width: 480px)")

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
        <div
            className="relative mb-3"
            onMouseEnter={isWide ? handleMouseEnter : undefined}
            onMouseLeave={isWide ? handleMouseLeave : undefined}
            onMouseMove={isWide ? handleMouseMove : undefined}
        >
            {images.length > 0 ? (
                <div className="w-full h-50 rounded-md bg-gray-200 dark:bg-gray-600 overflow-hidden flex items-center justify-center">
                    <img
                        src={images[isWide ? currentImageIndex : 0]}
                        alt={alt}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            ) : (
                <div className="w-full h-50 bg-gray-300 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm">
                    Нет фото
                </div>
            )}

            {isWide && hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {Array.from({ length: indicatorCount }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${i === activeIndicatorIndex ? 'w-4 bg-white dark:bg-gray-200' : 'w-2 bg-white/60 dark:bg-gray-400/60'}`}
                        />
                    ))}
                </div>
            )}

            {isWide && images.length > 4 && showExtraOverlay && (
                <div className="absolute inset-0 rounded-md bg-black/50 text-white flex items-center justify-center text-lg">
                    Еще {images.length - 4} фото
                </div>
            )}
        </div>
    )
}

export default AdsCardImage