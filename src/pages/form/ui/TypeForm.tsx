import type { UseStepsReturn }from "@chakra-ui/react"
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

    if(itemData?.type === "Авто") return(<AutoForm itemData={itemData} onChange={onChange} stepsStore={stepsStore}/>)
    if(itemData?.type === "Недвижимость") return(<PropertyForm itemData={itemData} onChange={onChange} stepsStore={stepsStore}/>)
    if(itemData?.type === "Услуги") return(<ServiceForm />)

}

export default TypeForm