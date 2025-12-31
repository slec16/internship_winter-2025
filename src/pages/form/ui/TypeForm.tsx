import {
    Stack,
    type UseStepsReturn
} from "@chakra-ui/react"
import { AutoForm } from "@/features/auto-form"
import { ServiceForm } from "@/features/service-form"
import { PropertyForm } from "@/features/property-form"
import { ItemGallery } from "@/entities/item"
import { Box } from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"

interface TypeFormProps {
    itemData: Partial<Item> | null,
    stepsStore: UseStepsReturn
    onChange: React.Dispatch<React.SetStateAction<Partial<Item> | null>>
}

const TypeForm = (props: TypeFormProps) => {
    const { itemData, stepsStore, onChange } = props

    // Если нет данных, показываем заглушку
    if (!itemData) {
        return null
    }

    // Рендерим соответствующую форму
    const renderForm = () => {
        switch (itemData.type) {
            case "Авто":
                return <AutoForm itemData={itemData} onChange={onChange} stepsStore={stepsStore} />
            case "Недвижимость":
                return <PropertyForm itemData={itemData} onChange={onChange} stepsStore={stepsStore} />
            case "Услуги":
                return <ServiceForm itemData={itemData} onChange={onChange} stepsStore={stepsStore} />
            default:
                return null
        }
    }

    return (
        <Stack w="full" direction="row">
            <Box w="1/2">
                {renderForm()}
            </Box>

            {itemData?.image && (
                <ItemGallery
                    name={itemData.name || ""}
                    images={itemData.image}
                />
            )}
        </Stack>
    )
}

export default TypeForm