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
import type { Item, BaseItem, ItemType } from "@/shared/types/items"
import { useEffect } from "react"
import { ItemGallery } from "@/entities/item"

interface commonFormProps {
    itemData: Partial<Item> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}


interface IFormInput {
    name: string
    description: string
    location: string
    image: { id: string, url: string }[]
    type: ItemType
}

const STORAGE_KEY = 'form_autosave_data'

const CommonForm = (props: commonFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit, watch, reset } = useForm<IFormInput>({
        defaultValues: {
            name: itemData?.name || "",
            description: itemData?.description || "",
            location: itemData?.location || "",
            image: Array.isArray(itemData?.image)
                ? itemData.image.map((url, index) => ({
                    id: `image_${index}_${Date.now()}`,
                    url: url || ""
                }))
                : [],
            type: itemData?.type || "Авто"
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "image",
    })

    const [nameValue, imageValue] = useWatch({
        control,
        name: ["name", "image"]
    })



    const onSubmit: SubmitHandler<IFormInput> = (data) => {

        const baseItemData: BaseItem = {
            name: data.name,
            description: data.description,
            location: data.location,
            image: data.image.map(item => item.url).filter(url => url.trim() !== ""),
            type: data.type
        };

        onChange((prev) => {
            return (
                {
                    ...prev,
                    ...baseItemData
                }
            )
        })
        localStorage.removeItem(STORAGE_KEY);
        stepsStore.goToNextStep()
    }


    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData)
                reset(parsedData);

                
            } catch (error) {
                console.error('Ошибка при восстановлении формы:', error)
            }
        }
    }, [reset])


    useEffect(() => {
        const subscription = watch((data) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        });

        return () => subscription.unsubscribe()
    }, [watch])

    // удаление при анмауенте
    useEffect(() => {
        return () => localStorage.removeItem(STORAGE_KEY)
    }, [])

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
                                <VStack spaceY="4" w="full">
                                    {fields.map((field, index) => (
                                        <HStack key={field.id} w="full">
                                            <Controller
                                                name={`image.${index}.url`}
                                                control={control}
                                                rules={{
                                                    required: "Поле не может быть пустым"
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <Box w="full">
                                                        <Input
                                                            w="full"
                                                            {...field}
                                                            value={field.value || ''}
                                                            placeholder={`Изображение ${index + 1}`}
                                                        />
                                                        {fieldState.error && (
                                                            <Text color="red">
                                                                {fieldState.error.message}
                                                            </Text>
                                                        )}
                                                    </Box>
                                                )}
                                            />
                                            <Button
                                                bg="buttonPrimary"
                                                aria-label="Удалить"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                            >Удалить</Button>
                                        </HStack>
                                    ))}

                                    <Button
                                        alignSelf="start"
                                        bg="buttonPrimary"
                                        onClick={() => append({ id: `image_${fields.length}_${Date.now()}`, url: '' })}
                                    >
                                        Добавить изображение
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
            {(imageValue != undefined && imageValue.length > 0) &&
                <ItemGallery
                    name={nameValue}
                    images={imageValue.map(item => item.url)}
                />
            }
        </Stack>
    )
}

export default CommonForm