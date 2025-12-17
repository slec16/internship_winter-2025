import { Box, Input, Stack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"

const AutoFilter = () => {

    // TODO: валидация
    
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [yearFrom, setYearFrom] = useState("")
    const [yearTo, setYearTo] = useState("")
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")

    const handleSubmit = () => {
        const filterData = {
            brand,
            model,
            yearFrom: yearFrom ? Number(yearFrom) : null,
            yearTo: yearTo ? Number(yearTo) : null,
            priceFrom: priceFrom ? Number(priceFrom) : null,
            priceTo: priceTo ? Number(priceTo) : null,
        }
        console.log("Filter data:", filterData)
    }
    
    return (
        <Box 
            bg="cardBg" 
            rounded="2xl" 
            p="5"
            borderWidth="1px"
            borderColor="border"
        >
            <Stack gap="4">
                {/* Марка */}
                <Box>
                    <Text 
                        fontSize="sm" 
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Марка
                    </Text>
                    <Input 
                        bg="inputBg" 
                        borderColor="inputBorder"
                        rounded="lg"
                        placeholder="Выберите марку"
                        _placeholder={{ color: "inputPlaceholder" }}
                        _focus={{ borderColor: "inputFocusBorder" }}
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Box>

                {/* Модель */}
                <Box>
                    <Text 
                        fontSize="sm" 
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Модель
                    </Text>
                    <Input 
                        bg="inputBg" 
                        borderColor="inputBorder"
                        rounded="lg"
                        placeholder="Выберите модель"
                        _placeholder={{ color: "inputPlaceholder" }}
                        _focus={{ borderColor: "inputFocusBorder" }}
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </Box>

                {/* Год выпуска */}
                <Box>
                    <Text 
                        fontSize="sm" 
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Год выпуска
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
                            value={yearFrom}
                            onChange={(e) => setYearFrom(e.target.value)}
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
                            value={yearTo}
                            onChange={(e) => setYearTo(e.target.value)}
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

export default AutoFilter