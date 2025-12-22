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

    const { item } = props

    
    const { name, image, ...uniqueFields } = item
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
            <VStack gap='2' mb="3">
                {/* TODO: price */}
                <ItemHeader name={name} price={item.price} />
                <Flex width="full" direction="row" alignItems="center" justifyContent="space-between">
                    <ItemBreadcrumbs type={item.type} name={item.name} />
                    <Button bg="green" opacity="80%">Редактировать</Button>
                </Flex>
            </VStack>
            {images.length > 0 && (
                <ItemGallery images={images} name={item.name}/>
            )}
            <ItemAttributes displayFields={displayFields} />
        </>
    )
}

export default ItemDetails