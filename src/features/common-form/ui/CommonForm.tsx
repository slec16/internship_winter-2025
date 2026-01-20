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
import { zodResolver } from "@hookform/resolvers/zod"
import type { Item, BaseItem } from "@/shared/types/items"
import { commonFormSchema, type CommonFormData } from "@/shared/lib/schemas"
import { ItemGallery } from "@/entities/item"

interface commonFormProps {
    itemData: Partial<Item> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}

const CommonForm = (props: commonFormProps) => {

    const { itemData, stepsStore, onChange } = props

    // TODO: save form after reload
    const { control, handleSubmit } = useForm<CommonFormData>({
        resolver: zodResolver(commonFormSchema),
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



    const onSubmit: SubmitHandler<CommonFormData> = (data) => {
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
        stepsStore.goToNextStep()
    }

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
                                    render={({ field, fieldState }) => (
                                        <Box w="full">
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
                                            {fieldState.error && (
                                                <Text color="red" fontSize="sm" mt="1">
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
                                    render={({ field, fieldState }) => (
                                        <Box w="full">
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
                                            {fieldState.error && (
                                                <Text color="red" fontSize="sm" mt="1">
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
                                    render={({ field, fieldState }) => (
                                        <Box w="full">
                                            <Input {...field} borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
                                            {fieldState.error && (
                                                <Text color="red" fontSize="sm" mt="1">
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
                                                render={({ field, fieldState }) => (
                                                    <Box w="full">
                                                        <Input
                                                            w="full"
                                                            {...field}
                                                            value={field.value || ''}
                                                            placeholder={`Изображение ${index + 1}`}
                                                        />
                                                        {fieldState.error && (
                                                            <Text color="red" fontSize="sm" mt="1">
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
                                    render={({ field, fieldState }) => (
                                        <Box w="full">
                                            <NativeSelect.Root >
                                                <NativeSelect.Field
                                                    {...field}
                                                    placeholder="Выберете тип"
                                                    borderColor={fieldState.error ? "red.500" : "inputBorder"}
                                                    outlineColor={fieldState.error ? "red.500" : "inputBorder"}
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
                                                <Text color="red" fontSize="sm" mt="1">
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
                        <Button
                            bg="buttonPrimary"
                            color="buttonPrimaryFg"
                            borderColor="buttonPrimary"
                            _hover={{
                                bg: "buttonPrimaryHover",
                            }}
                            disabled={!stepsStore.hasPrevStep}
                        >
                            Назад
                        </Button>
                        <Button
                            type="submit"
                            bg="buttonPrimary"
                            color="buttonPrimaryFg"
                            borderColor="buttonPrimary"
                            _hover={{
                                bg: "buttonPrimaryHover",
                            }}
                        >
                            Далее
                        </Button>
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