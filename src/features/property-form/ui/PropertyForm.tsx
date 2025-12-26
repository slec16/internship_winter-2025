import { useState } from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"

interface PropertyFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

const PropertyForm = (props: PropertyFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const [propertyType, setPropertyType] = useState("")
    const [area, setArea] = useState("")
    const [rooms, setRooms] = useState("")
    const [price, setPrice] = useState("")

    const propertyTypesArray = ["Квартира", "Дом", "Участок", "Гараж", "Коммерчиская недвижемость", "Недвижемость за рубежом"]

    const nextStep = () => {
        const propertyData = {
            propertyType: propertyType,
            area: Number(area),
            rooms: Number(rooms),
            price: Number(price)
        }
        onChange((prev) => {
            return(
                {
                    ...prev,
                    ...propertyData
                }
            )
        })
        stepsStore.goToNextStep()
    }

    const prevStep = () => {
        stepsStore.goToPrevStep()
    }

    return (
        <Box>
            <Fieldset.Root size="lg" maxW="md" mb="10">
                <Stack>
                    <Fieldset.Legend color="text">Информация о недвижимости</Fieldset.Legend>
                    <Fieldset.HelperText color="secondaryText">
                        Пожалуйста укажите следующую инфорамцию
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* TODO: default value */}
                    <Field.Root>
                        <Field.Label>Тип недвижимости</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                name="тип"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <For each={propertyTypesArray}>
                                    {(item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    )}
                                </For>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Площадь</Field.Label>
                        <Input
                            type="number"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Количество комант</Field.Label>
                        <Input
                            type="number"
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Цена</Field.Label>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Field.Root>
                </Fieldset.Content>
            </Fieldset.Root>


            <ButtonGroup size="sm" variant="outline">
                <Button bg="buttonPrimary" onClick={prevStep}>Назад</Button>
                <Button bg="buttonPrimary" onClick={nextStep}>Далее</Button>
            </ButtonGroup>
        </Box>
    )
}

export default PropertyForm