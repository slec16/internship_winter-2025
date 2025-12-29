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
import type { Item } from "@/shared/types/items"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"

interface AutoFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

interface IFormInput {
    brand: string,
    model: string,
    year: string,
    mileage: string
}

const AutoForm = (props: AutoFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            brand: itemData?.brand || "",
            model: itemData?.model || "",
            year: itemData?.year || "",
            mileage: itemData?.mileage || "",
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // console.log(data)
        // TODO: use here correspondingly type
        const transformedData = {
            ...data,
            year: data.year ? Number(data.year) : undefined,
            mileage: data.mileage ? Number(data.mileage) : undefined,
        }

        onChange((prev) => {
            return (
                {
                    ...prev,
                    ...transformedData
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
                            <Field.Label>Модель</Field.Label>
                            <Controller
                                name="model"
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
                            {/* <Input
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            /> */}
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Год</Field.Label>
                            <Controller
                                name="year"
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} type="number" borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"} />
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                            {/* <Input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            /> */}
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Пробег</Field.Label>
                            <Controller
                                name='mileage'
                                control={control}
                                rules={{
                                    required: "Это поле обязательно для заполнения"
                                }}
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input {...field} type="number" borderColor={fieldState.error ? "red.500" : "gray.200"} outlineColor={fieldState.error ? "red.500" : "gray.200"} />
                                        {fieldState.error && (
                                            <Text color="red">
                                                {fieldState.error.message}
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            />
                            {/* <Input
                                type="number"
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value)}
                            /> */}
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>


                <ButtonGroup size="sm" variant="outline">
                    <Button bg="buttonPrimary" onClick={prevStep}>Назад</Button>
                    <Button type='submit' bg="buttonPrimary">Далее</Button>
                </ButtonGroup>
            </form>
        </Box>
    )
}

export default AutoForm