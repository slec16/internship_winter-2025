import {
    Box,
    Text,
    Button,
    ButtonGroup,
    Steps,
    Field,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
    StepsTrigger,
    type UseStepsReturn
} from "@chakra-ui/react"
import { AutoForm } from "@/features/auto-form"
import { ServiceForm } from "@/features/service-form"
import { PropertyForm } from "@/features/property-form"
import type { Item } from "@/shared/types/items"


interface TypeFormProps {
    itemData: Item | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<{}>>
}


const TypeForm = (props: TypeFormProps) => {

    const { itemData, stepsStore, onChange } = props


    const nextStep = () => {
        props.stepsStore.goToNextStep()
    }

    const prevStep = () => {
        props.stepsStore.goToPrevStep()
    }

    if(itemData?.type === "Авто") return(<AutoForm />)
    if(itemData?.type === "Недвижимость") return(<PropertyForm />)
    if(itemData?.type === "Услуги") return(<ServiceForm />)

}

export default TypeForm