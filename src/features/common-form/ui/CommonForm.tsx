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
    HStack,
    type UseStepsReturn
} from "@chakra-ui/react"
import { useForm, Controller, type SubmitHandler, useWatch } from "react-hook-form"
import type { Item } from "@/shared/types/items"
import { useState, useEffect } from "react"
import { ItemGallery } from "@/entities/item"

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

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: "",
            description: "",
            location: "",
            image: "",
            type: ""
        },
    })

    const [nameValue, imageValue] = watch(["name", "image"]);
    // const [imageValue, nameValue] = useWatch({
    //     control,
    //     name: ["image", "name"], // можно указать массив полей
    //     defaultValue: ["", ""]
    // });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        stepsStore.goToNextStep()
        // TODO: use here baseItem type
        onChange(data)
    }

    useEffect(() => {
        console.log(imageValue)
    }, [imageValue])

    // const [inputs, setInputs] = useState<string[]>([''])

    // const addInput = () => {
    //     setInputs([...inputs, ''])
    // };

    // const removeInput = (index: number) => {
    //     setInputs(inputs.filter((_, i) => i !== index))
    // };

    // const updateInput = (index: number, value: string) => {
    //     const newInputs = [...inputs]
    //     newInputs[index] = value
    //     setInputs(newInputs)
    // };

    return (
        <Stack w="full" direction="row">        
            <Box w="1/2">
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
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"} />
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
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"} />
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
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"} />
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
                                {/* <Stack spaceY="2" w="full">
                                    {inputs.map((value, index) => (
                                        <HStack key={index} spaceX={2}>
                                            <Input
                                                value={value}
                                                onChange={(e) => updateInput(index, e.target.value)}
                                                placeholder={`Элемент ${index + 1}`}
                                            />
                                            {inputs.length > 1 && (
                                                <Button
                                                    aria-label="Удалить"
                                                    onClick={() => removeInput(index)}
                                                    color="brand"
                                                    size="sm"
                                                >Удалить</Button>
                                            )}
                                        </HStack>
                                    ))}
                                    <Button
                                        onClick={addInput}
                                        colorScheme="blue"
                                        variant="outline"
                                    >
                                        Добавить поле
                                    </Button>
                                </Stack> */}
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
            {imageValue && 
                <ItemGallery
                    name="test"
                    images={[imageValue]}
                />
            }
        </Stack>
    )
}

export default CommonForm