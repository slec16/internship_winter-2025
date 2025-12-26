import { useState } from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Fieldset,
    Input,
    NativeSelect,
    For,
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"

interface ServiceFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

const ServiceForm = (props: ServiceFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const [serviceType, setServiceType] = useState("")
    const [experience, setExperience] = useState("")
    const [cost, setCost] = useState("")
    const [workShedule, setWorktShedule] = useState("")

    const nextStep = () => {
        const propertData = {
            serviceType: serviceType,
            experience: Number(experience),
            cost: Number(cost),
            workShedule: workShedule
        }
        onChange((prev) => {
            return(
                {
                    ...prev,
                    ...propertData
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
                        <Input
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Опыт</Field.Label>
                        <Input
                            type="number"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Цена</Field.Label>
                        <Input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Расписание</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                name="тип"
                                value={workShedule}
                                onChange={(e) => setWorktShedule(e.target.value)}
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
                    </Field.Root>
                </Fieldset.Content>
            </Fieldset.Root>


            <ButtonGroup size="sm" variant="outline">
                <Button bg="buttonPrimary" onClick={prevStep}>Назад</Button>
                <Button bg="buttonPrimary" onClick={nextStep}>Далее</Button>
            </ButtonGroup>
        </Box>
    )
}

export default ServiceForm