import { useState } from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Fieldset,
    Text,
    Input,
    NativeSelect,
    For,
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"

interface ServiceFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

interface IFormInput {
    serviceType: string,
    experience: string,
    cost: string,
    workShedule: string
}

const ServiceForm = (props: ServiceFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            serviceType: "",
            experience: "",
            cost: "",
            workShedule: ""
        }
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // console.log(data)
        // TODO: use here correspondingly type
        const transformedData = {
            ...data,
            experience: data.experience ? Number(data.experience) : undefined,
            cost: data.cost ? Number(data.cost) : undefined,
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
                        <Fieldset.Legend color="text">Информация об услуге</Fieldset.Legend>
                        <Fieldset.HelperText color="secondaryText">
                            Пожалуйста укажите следующую инфорамцию
                        </Fieldset.HelperText>
                    </Stack>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Тип услуги</Field.Label>
                            <Controller
                                name="serviceType"
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
                            <Field.Label>Опыт</Field.Label>
                            <Controller
                                name="experience"
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
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Цена</Field.Label>
                            <Controller
                                name="cost"
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
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Расписание</Field.Label>
                            <Controller
                                name="workShedule"
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
                                                <For each={["5/2", "7/0", "По договоренности"]}>
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
                    <Button bg="buttonPrimary" onClick={prevStep}>Назад</Button>
                    <Button type="submit" bg="buttonPrimary">Далее</Button>
                </ButtonGroup>
            </form>
        </Box>
    )
}

export default ServiceForm