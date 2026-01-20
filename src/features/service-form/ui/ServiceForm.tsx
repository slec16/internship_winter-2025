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
import type { Item, ServiceItem } from "@/shared/types/items"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviseFormSchema, type ServiceFormInput, type ServiceFormData } from "@shared/lib/schemas"

interface ServiceFormProps {
    itemData: Partial<ServiceItem> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}

const ServiceForm = (props: ServiceFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const { control, handleSubmit } = useForm<ServiceFormInput, unknown, ServiceFormData>({
        resolver: zodResolver(serviseFormSchema),
        defaultValues: {
            serviceType: itemData?.serviceType || "",
            experience: itemData?.experience ?? "",
            cost: itemData?.cost ?? "",
            workShedule: itemData?.workShedule ?? ""
        }
    })

    const onSubmit = (data: ServiceFormData) => {

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
                                render={({ field, fieldState }) => (
                                    <Box w="full">
                                        <Input
                                            {...field}
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
                            <Field.Label>Опыт</Field.Label>
                            <Controller
                                name="experience"
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
                            <Field.Label>Цена</Field.Label>
                            <Controller
                                name="cost"
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
                            <Field.Label>Расписание</Field.Label>
                            <Controller
                                name="workShedule"
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
                        onClick={prevStep}
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
    )
}

export default ServiceForm