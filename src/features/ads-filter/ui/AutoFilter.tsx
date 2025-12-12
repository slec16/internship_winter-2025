import { Box, Input, NumberInput, Stack, Text } from "@chakra-ui/react"

const AutoFilter = () => {

    return(
        <Box bg="cardBg" rounded={"2xl"} p="3">
            <Text>Марка</Text>
            <Input bg="white"/>
            <Text>Модель</Text>
            <Input bg="white"/>
            <Text>Год выпуска</Text>
            <Stack direction="row">
                <Input /> - <Input />
            </Stack>
        </Box>
    )
}

export default AutoFilter