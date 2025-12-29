import {
    Box,
    VStack,
    Text,
    Button,
    ButtonGroup,
    type UseStepsReturn
} from "@chakra-ui/react"
import type { Item } from "@/shared/types/items"
import { ItemHeader, ItemGallery, ItemAttributes, fieldTranslations } from "@entities/item"
import { useCreateItemMutation, useUpdateItemMutation } from "@shared/api"

const Preview = ({ itemData, stepsStore }: { itemData: Item | null, stepsStore: UseStepsReturn }) => {

    const [createItem, { isLoading: isCreating }] = useCreateItemMutation()
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation()

    if (!itemData) return (<div>Произошла ошибка</div>)

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

    const saveAds = async () => {
        if(itemData.id) {
            try {
                await updateItem({id: itemData.id, ...itemData}).unwrap()
                stepsStore.goToNextStep()
            } catch (err) {
                console.error(err)
            }
        } else{
            try {
                await createItem(itemData).unwrap()
                stepsStore.goToNextStep()
            } catch (err) {
                console.error(err)
            }
        }
       
    }

    return (
        <Box>
            <VStack alignItems="start" mb="3">
                <Text textStyle="2xl">Предварительный вид</Text>
                <Text>Проверьте объявлеине</Text>
            </VStack>
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