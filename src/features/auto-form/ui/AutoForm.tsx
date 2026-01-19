import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Fieldset,
    Input,
    Stack,
    Text,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item, AutoItem } from "@/shared/types/items"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { autoFormSchema, type AutoFormInput, type AutoFormData } from "@/shared/lib/schemas"

interface AutoFormProps {
    itemData: Partial<AutoItem> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}


const AutoForm = (props: AutoFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit } = useForm<AutoFormInput, unknown, AutoFormData>({
        resolver: zodResolver(autoFormSchema),
        defaultValues: {
            brand: itemData?.brand || "",
            model: itemData?.model || "",
            year: itemData?.year ?? "",
            mileage: itemData?.mileage ?? "",
        }
    })

    const onSubmit = (data: AutoFormData) => {
      
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

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root size="lg" maxW="md" mb="10">
                    <Stack>
                        <Fieldset.Legend color="text">Информация об авто</Fieldset.Legend>
                        <Fieldset.HelperText color="secondaryText">
                            Пожалуйста укажите следующую инфорамцию
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Марка</Field.Label>
                            <Controller
                                name='brand'
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
                            <Field.Label>Модель</Field.Label>
                            <Controller
                                name="model"
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
                            <Field.Label>Год</Field.Label>
                            <Controller
                                name="year"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input 
                                            {...field} 
                                            // value={field.value === undefined ? "" : field.value} 
                                            value={String(field.value ?? "")}
                                            type="number" 
                                            borderColor={fieldState.error ? "red.500" : "inputBorder"} 
                                            outlineColor={fieldState.error ? "red.500" : "inputBorder"} 
                                        />
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
                            <Field.Label>Пробег</Field.Label>
                            <Controller
                                name='mileage'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input 
                                        {...field} 
                                        // value={field.value === undefined ? "" : field.value} 
                                        value={String(field.value ?? "")}
                                        type="number" 
                                        borderColor={fieldState.error ? "red.500" : "inputBorder"} 
                                        outlineColor={fieldState.error ? "red.500" : "inputBorder"} />
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
                    <Button onClick={prevStep}>Назад</Button>
                    <Button type='submit'>Далее</Button>
                </ButtonGroup>
            </form>
        </Box>
    )
}

export default AutoForm