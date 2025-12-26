import { useState } from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Field,
    Fieldset,
    Input,
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"

interface AutoFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}

const AutoForm = (props: AutoFormProps) => {

    const { itemData, stepsStore, onChange } = props

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")

    const nextStep = () => {
        const autoData = {
            brand: brand,
            model: model,
            year: Number(year),
            mileage: Number(mileage)
        }
        onChange((prev) => {
            return(
                {
                    ...prev,
                    ...autoData
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
                    <Fieldset.Legend color="text">Информация об авто</Fieldset.Legend>
                    <Fieldset.HelperText color="secondaryText">
                        Пожалуйста укажите следующую инфорамцию
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Марка</Field.Label>
                        <Input
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Модель</Field.Label>
                        <Input
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Год</Field.Label>
                        <Input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Пробег</Field.Label>
                        <Input
                            type="number"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                        />
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

export default AutoForm