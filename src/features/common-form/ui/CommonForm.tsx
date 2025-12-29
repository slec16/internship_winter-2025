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
    VStack,
    type UseStepsReturn
} from "@chakra-ui/react"
import { useForm, Controller, type SubmitHandler, useWatch, useFieldArray } from "react-hook-form"
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
    image: string[],
    type: string
}

const STORAGE_KEY = 'form_autosave_data';

const CommonForm = (props: commonFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            name: itemData?.name || "",
            description: itemData?.description || "",
            location: itemData?.location || "",
            image: itemData?.image || [""],
            type: itemData?.type || ""
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "image", // имя массива
    });

    // const [nameValue, imageValue] = watch(["name", "image"]);
    const [nameValue, imageValue] = useWatch({
        control,
        name: ["name", "image"]
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // TODO: use here baseItem type
        onChange((prev) => {
            return (
                {
                    ...prev,
                    ...data
                }
            )
        })
        localStorage.removeItem(STORAGE_KEY);
        stepsStore.goToNextStep()
    }


    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);

                reset(parsedData);

                if (onChange) {
                    onChange(parsedData);
                }
            } catch (error) {
                console.error('Ошибка при восстановлении формы:', error);
            }
        }
    }, [reset, onChange]);


    useEffect(() => {
        const subscription = watch((data) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        });

        return () => subscription.unsubscribe();
    }, [watch]);

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
                                {/* <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                /> */}
                                <VStack spaceY="4">
                                    {fields.map((field, index) => (
                                        <HStack key={field.id} width="100%">
                                            <Controller
                                                name={`image.${index}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        placeholder={`Тег ${index + 1}`}
                                                    />
                                                )}
                                            />
                                            <Button
                                                aria-label="Удалить"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                            />
                                        </HStack>
                                    ))}

                                    <Button
                                        onClick={() => append('')} // Добавляем пустую строку
                                    >
                                        Добавить тег
                                    </Button>
                                </VStack>
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
                    name={nameValue}
                    images={imageValue}
                />
            }
        </Stack>
    )
}

export default CommonForm