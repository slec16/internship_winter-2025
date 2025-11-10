import { useGetItemsQuery, useCreateItemMutation } from "../api/itemsApi"
import generateRandomItem from "../utils/randomItem"
import { Button } from "@mui/material"

const List = () => {
    
    const { data, error, isLoading } = useGetItemsQuery()
    const [ createItem, { isLoading: isCreating } ] = useCreateItemMutation()

    console.log(data, error, isLoading)

    const handleCreateRandom = async() => {
        try{
            const randomItem = generateRandomItem()
            await createItem(randomItem).unwrap()
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Объявления</h1>
                <Button
                    onClick={handleCreateRandom}
                    disabled={isCreating}
                    variant="contained"
                >
                    Создать случайное объявление
                </Button>
            </div>
        </>
    )
}

export default List