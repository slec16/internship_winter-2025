import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Text,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import type { Item } from "@/shared/types/items"

interface commonFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Item | null>>
}

interface IFormInput {
    name: string,
    description: string,
    location: string,
    image: string,
    type: string
}

const CommonForm = (props: commonFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit,  formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            location: "",
            image: "",
            type: ""
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        stepsStore.goToNextStep()
        // TODO: use here baseItem type
        onChange(data)
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения" 
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"}/>
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Описание</Field.Label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения" 
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"}/>
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Локация</Field.Label>
                            <Controller
                                name="location"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения" 
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"}/>
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Фото</Field.Label>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Тип объявления</Field.Label>
                            <Controller
                                name="type"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <NativeSelect.Root >
                                            <NativeSelect.Field
                                                {...field}
                                                placeholder="Выберете тип"
                                                borderColor={fieldState.error ? "red.500" : "gray.200"}
                                                outlineColor={fieldState.error ? "red.500" : "gray.200"}
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
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>


                <ButtonGroup size="sm" variant="outline">
                    <Button bg="buttonPrimary" disabled={!stepsStore.hasPrevStep}>Назад</Button>
                    <Button type="submit" bg="buttonPrimary">Далее</Button>
                </ButtonGroup>
            </form>
        </Box>
    )
}

export default CommonForm