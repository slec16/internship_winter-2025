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
import type { Item, PropertyItem } from "@/shared/types/items"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"

interface PropertyFormProps {
    itemData: Partial<PropertyItem> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}

const PropertyForm = (props: PropertyFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit } = useForm<PropertyItem>({
        defaultValues: {
            propertyType: itemData?.propertyType || "",
            area: itemData?.area,
            rooms: itemData?.rooms,
            price: itemData?.price,
        }
    })

    const onSubmit: SubmitHandler<PropertyItem> = (data) => {
        onChange((prev) => {
            return (
                {
                    ...prev,
                    ...data
                }
            )
        })
        stepsStore.goToNextStep()
    }

    const prevStep = () => {
        stepsStore.goToPrevStep()
    }

    const propertyTypesArray = ["Квартира", "Дом", "Участок", "Гараж", "Коммерчиская недвижемость", "Недвижемость за рубежом"]


    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Controller
                                name='propertyType'
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
                                                borderColor={fieldState.error ? "red.500" : "inputBorder"}
                                                outlineColor={fieldState.error ? "red.500" : "inputBorder"}
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
                            <Field.Label>Площадь</Field.Label>
                            <Controller
                                name="area"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} value={field.value === undefined ? "" : field.value} type="number" borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
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
                            <Field.Label>Количество комант</Field.Label>
                            <Controller
                                name="rooms"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} value={field.value === undefined ? "" : field.value} type="number" borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
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
                            <Field.Label>Цена</Field.Label>
                            <Controller
                                name="price"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} value={field.value === undefined ? "" : field.value} type="number" borderColor={fieldState.error ? "red.500" : "inputBorder"} outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
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
                    <Button onClick={prevStep}>Назад</Button>
                    <Button type="submit">Далее</Button>
                </ButtonGroup>
            </form>
        </Box>
    )
}

export default PropertyForm