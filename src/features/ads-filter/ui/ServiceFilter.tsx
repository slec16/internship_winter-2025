import { Box, Input, Stack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"

const ServiceFilter = () => {

    // TODO: валидация

    const experienceOptions = ["Без опыта", "1-3 года", "3-6 лет", "Более 6 лет"]
    const scheduleOptions = ["5/2", "7/0", "По договоренности"]
    
    const [serviceType, setServiceType] = useState("")
    const [selectedExperience, setSelectedExperience] = useState<string[]>([])
    const [selectedSchedule, setSelectedSchedule] = useState<string[]>([])
    const [priceFrom, setPriceFrom] = useState("")
    const [priceTo, setPriceTo] = useState("")

    const toggleExperience = (exp: string) => {
        setSelectedExperience(prev => 
            prev.includes(exp) 
                ? prev.filter(e => e !== exp) 
                : [...prev, exp]
        )
    }

    const toggleSchedule = (schedule: string) => {
        setSelectedSchedule(prev => 
            prev.includes(schedule) 
                ? prev.filter(s => s !== schedule) 
                : [...prev, schedule]
        )
    }

    const handleSubmit = () => {
        const filterData = {
            serviceType,
            experience: selectedExperience,
            schedule: selectedSchedule,
            priceFrom: priceFrom ? Number(priceFrom) : null,
            priceTo: priceTo ? Number(priceTo) : null,
        }
        console.log("Filter data:", filterData)
    }
 
    return(
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
                        Тип Услуги
                    </Text>
                    <Input 
                        bg="inputBg" 
                        borderColor="inputBorder"
                        rounded="lg"
                        placeholder="Выберите модель"
                        _placeholder={{ color: "inputPlaceholder" }}
                        _focus={{ borderColor: "inputFocusBorder" }}
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                    />
                </Box>
                {/* Опыт */}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        Опыт
                    </Text>
                    <Stack direction="row" gap="2" flexWrap="wrap" justify="flex-start">
                        {experienceOptions.map((exp) => (
                            <Button
                                key={exp}
                                size="sm"
                                rounded="xl"
                                variant={selectedExperience.includes(exp) ? "solid" : "outline"}
                                bg={selectedExperience.includes(exp) ? "buttonPrimary" : "transparent"}
                                color={selectedExperience.includes(exp) ? "buttonPrimaryFg" : "mutedText"}
                                borderColor={selectedExperience.includes(exp) ? "buttonPrimary" : "inputBorder"}
                                _hover={{
                                    bg: selectedExperience.includes(exp) ? "buttonPrimaryHover" : "inputBg",
                                }}
                                onClick={() => toggleExperience(exp)}
                            >
                                {exp}
                            </Button>
                        ))}
                    </Stack>
                </Box>
                {/* Расписание */}
                <Box>
                    <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="text"
                        mb="1.5"
                    >
                        График работы
                    </Text>
                    <Stack direction="row" gap="2" flexWrap="wrap" justify="flex-start">
                        {scheduleOptions.map((schedule) => (
                            <Button
                                key={schedule}
                                size="sm"
                                rounded="xl"
                                variant={selectedSchedule.includes(schedule) ? "solid" : "outline"}
                                bg={selectedSchedule.includes(schedule) ? "buttonPrimary" : "transparent"}
                                color={selectedSchedule.includes(schedule) ? "buttonPrimaryFg" : "mutedText"}
                                borderColor={selectedSchedule.includes(schedule) ? "buttonPrimary" : "inputBorder"}
                                _hover={{
                                    bg: selectedSchedule.includes(schedule) ? "buttonPrimaryHover" : "inputBg",
                                }}
                                onClick={() => toggleSchedule(schedule)}
                            >
                                {schedule}
                            </Button>
                        ))}
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

export default ServiceFilter