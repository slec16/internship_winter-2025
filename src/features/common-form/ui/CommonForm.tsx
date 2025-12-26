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

interface commonFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}


const CommonForm = (props: commonFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")

    const nextStep = () => {
        const base = {
            name: name,
            description: description,
            location: location,
            image: image,
            type: type
        }
        onChange(base)
        stepsStore.goToNextStep()
    }

    return (
        <Box>
            <Fieldset.Root size="lg" maxW="md" mb="10">
                <Stack>
                    <Fieldset.Legend color="text">Данные объявления</Fieldset.Legend>
                    <Fieldset.HelperText color="secondaryText">
                        Пожалуйста укажите следующую инфорамцию
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Название</Field.Label>
                        <Input
                            name="title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Описание</Field.Label>
                        <Input
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Локация</Field.Label>
                        <Input
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Фото</Field.Label>
                        <Input
                            name="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Field.Root>

                    {/* TODO: default value */}
                    <Field.Root>
                        <Field.Label>Тип объявления</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                name="тип"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <For each={["Авто", "Недвижимость", "Услуги"]}>
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
                </Fieldset.Content>
            </Fieldset.Root>


            <ButtonGroup size="sm" variant="outline">
                <Button bg="buttonPrimary" disabled={!stepsStore.hasPrevStep}>Назад</Button>
                <Button  bg="buttonPrimary" onClick={nextStep}>Далее</Button>
            </ButtonGroup>
        </Box>
    )
}

export default CommonForm