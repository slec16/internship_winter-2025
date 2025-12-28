import {
    Box,
    VStack,
    Flex,
    Button,
    ButtonGroup,
    type UseStepsReturn
} from "@chakra-ui/react"
import ItemBreadcrumbs from "@widgets/item-details"
import type { Item } from "@/shared/types/items"
import { ItemHeader, ItemGallery, ItemAttributes, fieldTranslations } from "@entities/item"


const Preview = ({ itemData, stepsStore }: { itemData: Item | null, stepsStore: UseStepsReturn }) => {

    console.log(itemData)

      if( !itemData ) return(<div>Произошла ошибка</div>)
    const { name, image, description, location, ...uniqueFields } = itemData
    const displayFields = Object.entries(uniqueFields).filter(
        ([key]) => fieldTranslations[key],
    )

    const images = Array.isArray(image)
        ? image
        : image
            ? [image]
            : []

    const prevStep = () => {
        stepsStore.goToPrevStep()
    }

    const saveAds = () => {
        console.log(itemData)
        stepsStore.goToNextStep()
    }

    return (
        <Box>
            <VStack gap='4' mb="3">
                <ItemHeader name={name} price={itemData.type === 'Недвижимость' ? itemData.price : itemData.type === 'Услуги' ? itemData.cost : 0} />
            </VStack>
            {
                images.length > 0 && (
                    <ItemGallery images={images} name={itemData.name} />
                )
            }
            <ItemAttributes description={description} location={location} displayFields={displayFields} />
            <ButtonGroup size="sm" variant="outline" mt="4">
                <Button bg="buttonPrimary" onClick={prevStep}>Назад</Button>
                <Button bg="green" onClick={saveAds}>Сохранить объявлеине</Button>
            </ButtonGroup>
        </Box >
    )
}

export default Preview