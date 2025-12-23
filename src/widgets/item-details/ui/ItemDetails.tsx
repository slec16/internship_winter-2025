import { useNavigate } from "react-router-dom"
import {
    VStack,
    Flex,
    Button,
} from "@chakra-ui/react"
import ItemBreadcrumbs from "./ItemBreadcrumbs"
import type { Item } from "@/shared/types/items"
import { ItemHeader, ItemGallery, ItemAttributes, fieldTranslations } from "@entities/item"
 
interface ItemDetailsProps {
    item: Item
}

const ItemDetails = (props: ItemDetailsProps) => {

    const navigate = useNavigate()

    const { item } = props

    const { name, image, description, location, ...uniqueFields } = item
    const displayFields = Object.entries(uniqueFields).filter(
        ([key]) => fieldTranslations[key],
    )

    const images = Array.isArray(image)
        ? image
        : image
            ? [image]
            : []


    return(
        <>
            <VStack gap='4' mb="3">
                <ItemHeader name={name} price={item.type === 'Недвижимость' ? item.price : item.type === 'Услуги' ? item.cost : 0} />
                <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
                    <ItemBreadcrumbs item={item} />
                </Flex>
            </VStack>
            {/* TODO: заглушка */}
            {images.length > 0 && (
                <ItemGallery images={images} name={item.name}/>
            )}
            <ItemAttributes description={description} location={location} displayFields={displayFields} />
            <Button onClick={() => navigate("/form")} my="5" bg="green" opacity="80%">Редактировать</Button>
        </>
    )
}

export default ItemDetails