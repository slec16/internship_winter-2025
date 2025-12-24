import { Box, Input, Stack, Text, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useQueryParams } from "@shared/lib/useQueryParams"

const AutoFilter = () => {
    const { searchParams, setSearchParams } = useQueryParams()
    
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [yearFrom, setYearFrom] = useState("")
    const [yearTo, setYearTo] = useState("")
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")

    useEffect(() => {
        setBrand(searchParams.get('brand') || '')
        setModel(searchParams.get('model') || '')
        setYearFrom(searchParams.get('yearFrom') || '')
        setYearTo(searchParams.get('yearTo') || '')
        setPriceFrom(searchParams.get('priceFrom') || '')
        setPriceTo(searchParams.get('priceTo') || '')
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = () => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)

            params.delete('brand')
            params.delete('model')
            params.delete('yearFrom')
            params.delete('yearTo')
            params.delete('priceFrom')
            params.delete('priceTo')

            if (brand.trim()) params.set('brand', brand.trim())
            if (model.trim()) params.set('model', model.trim())
            if (yearFrom.trim()) params.set('yearFrom', yearFrom.trim())
            if (yearTo.trim()) params.set('yearTo', yearTo.trim())
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