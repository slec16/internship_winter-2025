import { useNavigate } from "react-router-dom"
import {
    VStack,
    Flex,
    Button,
} from "@chakra-ui/react"
import ItemHeader from "@/entities/item/ui/ItemHeader"
import ItemGallery from "@/entities/item/ui/ItemGallery"
import ItemAttributes from "@/entities/item/ui/ItemAttributes"
import ItemBreadcrumbs from "./ItemBreadcrumbs"
import type { Item } from "@/shared/types/items"
import { fieldTranslations } from "@entities/item"
 
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
                {/* TODO: price */}
                <ItemHeader name={name} price={item.price} />
                <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
                    <ItemBreadcrumbs type={item.type} name={item.name} />
                </Flex>
            </VStack>
            {images.length > 0 && (
                <ItemGallery images={images} name={item.name}/>
            )}
            <ItemAttributes description={description} location={location} displayFields={displayFields} />
            <Button onClick={() => navigate("/form")} my="5" bg="green" opacity="80%">Редактировать</Button>
        </>
    )
}

export default ItemDetails