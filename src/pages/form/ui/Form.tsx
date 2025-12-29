import { useState, useEffect } from "react"
import {
    Box,
    Text,
    Button,
    ButtonGroup,
    Steps,
    useSteps
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import type { Item, BaseItem } from "@/shared/types/items"
import { CommonForm } from "@/features/common-form"
import TypeForm from "./TypeForm"
import Preview from "./Preview"

const Form = () => {

    const location = useLocation()
    const item: Item | undefined = location.state?.item

    const [itemData, setItemData] = useState<Item | null>(null)

    const stepsStore = useSteps({
        defaultStep: 0,
        count: 3,
    })

    useEffect(() => {
        console.log("!!!!!!!!!",itemData)
    }, [itemData])


    const steps = [
        {
            title: "Шаг 1",
            // description: "Шаг 1 description",
            // commonForm.tsx
            component: <CommonForm itemData={itemData} onChange={setItemData} stepsStore={stepsStore} />
        },
        {
            title: "Шаг 2",
            // description: itemType && typeToFormComponent[itemType],
            // typeForm
            component: <TypeForm itemData={itemData} onChange={setItemData} stepsStore={stepsStore}/>
        },
        {
            title: "Шаг 3",
            // description: "Шаг 3 description",
            // preview
            component: <Preview itemData={itemData} stepsStore={stepsStore}/>
        },
    ]

   

    return (
        <Box p="5">
            <Text textStyle="xl" fontWeight="400" mb="10">{!item ? "Создание" : "Редактирование"} объявления</Text>
            <Box px="20">
                <Steps.RootProvider value={stepsStore}>
                    <Steps.List>
                        {steps.map((step, index) => (
                            <Steps.Item key={index} index={index} title={step.title}>
                                <Steps.Indicator />
                                <Steps.Title>{step.title}</Steps.Title>
                                <Steps.Separator />
                            </Steps.Item>
                        ))}
                    </Steps.List>

                    {steps.map((step, index) => (
                        <Steps.Content key={index} index={index}>
                            {step.component}
                        </Steps.Content>
                    ))}

                    {/* TODO: in component */}
                    <Steps.CompletedContent><CompletedContent item={item}/></Steps.CompletedContent>

                </Steps.RootProvider>
            </Box>
        </Box>
    )
}

export default Form


const CompletedContent = ({item}: {item: Item | undefined}) => {

    const navigate = useNavigate()

    return(
        <Box>
            <Text textStyle="lg" fontWeight="500">Объявление успешно {item ? "изменено" : "создано"}</Text>
            <Button
                onClick={() => navigate("/")}
            >
                Перейти на главную
            </Button>
        </Box>
    )
}