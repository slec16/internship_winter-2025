import { Box, Input, Stack, Text, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useQueryParams } from "@shared/lib/useQueryParams"

const PropertyFilter = () => {
    const { searchParams, setSearchParams } = useQueryParams()
    
    const propertyTypes = ["Квартира", "Дом", "Участок", "Гараж", "Коммерчиская недвижемость", "Недвижемость за рубежом"]
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [rooms, setRooms] = useState<number[]>([])
    const [areaFrom, setAreaFrom] = useState("")
    const [areaTo, setAreaTo] = useState("")
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")

    useEffect(() => {
        const propertyTypesParam = searchParams.get('propertyTypes')
        if (propertyTypesParam) {
            setSelectedTypes(propertyTypesParam.split(',').map(t => t.trim()).filter(Boolean))
        }

        const roomsParam = searchParams.get('rooms')
        if (roomsParam) {
            setRooms(roomsParam.split(',').map(r => Number(r.trim())).filter(n => !isNaN(n)))
        }

        setAreaFrom(searchParams.get('areaFrom') || '')
        setAreaTo(searchParams.get('areaTo') || '')
        setPriceFrom(searchParams.get('priceFrom') || '')
        setPriceTo(searchParams.get('priceTo') || '')
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const toggleType = (type: string) => {
        setSelectedTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type) 
                : [...prev, type]
        )
    }

    const toggleRoom = (room: number) => {
        setRooms(prev => 
            prev.includes(room) 
                ? prev.filter(r => r !== room) 
                : [...prev, room]
        )
    }

    const handleSubmit = () => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            
            params.delete('propertyTypes')
            params.delete('rooms')
            params.delete('areaFrom')
            params.delete('areaTo')
            params.delete('priceFrom')
            params.delete('priceTo')
            
            if (selectedTypes.length > 0) {
                params.set('propertyTypes', selectedTypes.join(','))
            }
            if (rooms.length > 0) {
                params.set('rooms', rooms.join(','))
            }
            if (areaFrom.trim()) params.set('areaFrom', areaFrom.trim())
            if (areaTo.trim()) params.set('areaTo', areaTo.trim())
            if (priceFrom.trim()) params.set('priceFrom', priceFrom.trim())
            if (priceTo.trim()) params.set('priceTo', priceTo.trim())
            
            return params
        })
    }

    return (
        <Box
            bg="cardBg"
            rounded="lg"
            p="5"
        >
            <Stack gap="4">
                {/* Тип */}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Тип недвижимости
                    </Text>
                    <Stack direction="row" gap="2" flexWrap="wrap" justify="flex-start">
                        {propertyTypes.map((type) => (
                            <Button
                                key={type}
                                size="sm"
                                rounded="xl"
                                variant={selectedTypes.includes(type) ? "solid" : "outline"}
                                bg={selectedTypes.includes(type) ? "buttonPrimary" : "transparent"}
                                color={selectedTypes.includes(type) ? "buttonPrimaryFg" : "mutedText"}
                                borderColor={selectedTypes.includes(type) ? "buttonPrimary" : "inputBorder"}
                                _hover={{
                                    bg: selectedTypes.includes(type) ? "buttonPrimaryHover" : "inputBg",
                                }}
                                onClick={() => toggleType(type)}
                            >
                                {type}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                {/* Комнаты */}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Комнат
                    </Text>
                    <Stack direction="row" gap="2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Button
                                key={num}
                                size="sm"
                                rounded="xl"
                                variant={rooms.includes(num) ? "solid" : "outline"}
                                bg={rooms.includes(num) ? "buttonPrimary" : "transparent"}
                                color={rooms.includes(num) ? "buttonPrimaryFg" : "mutedText"}
                                borderColor={rooms.includes(num) ? "buttonPrimary" : "inputBorder"}
                                _hover={{
                                    bg: rooms.includes(num) ? "buttonPrimaryHover" : "inputBg",
                                }}
                                onClick={() => toggleRoom(num)}
                            >
                                {num}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                {/* Площадь*/}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Площадь
                    </Text>
                    <Stack direction="row" align="center" gap="3">
                        <Input
                            type="number"
                            bg="inputBg"
                            borderColor="inputBorder"
                            rounded="lg"
                            placeholder="От"
                            _placeholder={{ color: "inputPlaceholder" }}
                            _focus={{ borderColor: "inputFocusBorder" }}
                            value={areaFrom}
                            onChange={(e) => setAreaFrom(e.target.value)}
                        />
                        <Text color="mutedText" fontWeight="medium">—</Text>
                        <Input
                            type="number"
                            bg="inputBg"
                            borderColor="inputBorder"
                            rounded="lg"
                            placeholder="До"
                            _placeholder={{ color: "inputPlaceholder" }}
                            _focus={{ borderColor: "inputFocusBorder" }}
                            value={areaTo}
                            onChange={(e) => setAreaTo(e.target.value)}
                        />
                    </Stack>
                </Box>

                {/* Цена */}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Цена, ₽
                    </Text>
                    <Stack direction="row" align="center" gap="3">
                        <Input
                            type="number"
                            bg="inputBg"
                            borderColor="inputBorder"
                            rounded="lg"
                            placeholder="От"
                            _placeholder={{ color: "inputPlaceholder" }}
                            _focus={{ borderColor: "inputFocusBorder" }}
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                        />
                        <Text color="mutedText" fontWeight="medium">—</Text>
                        <Input
                            type="number"
                            bg="inputBg"
                            borderColor="inputBorder"
                            rounded="lg"
                            placeholder="До"
                            _placeholder={{ color: "inputPlaceholder" }}
                            _focus={{ borderColor: "inputFocusBorder" }}
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                        />
                    </Stack>
                </Box>
                <Button
                    variant="solid"
                    bg="buttonPrimary"
                    color="buttonPrimaryFg"
                    borderColor="buttonPrimary"
                    _hover={{
                        bg: "buttonPrimaryHover",
                    }}
                    onClick={handleSubmit}
                >
                    Показать объявления
                </Button>
            </Stack>
        </Box>
    )
}

export default PropertyFilter