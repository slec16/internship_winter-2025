import { useGetItemsQuery, useCreateItemMutation } from "@shared/api/itemsApi"
import AdsList from "@widgets/ads-list"
import LoadingSpinner from "@shared/ui/LoadingSpinner"
import generateRandomItem from "@shared/lib/randomItem"
import { Button } from "@mui/material"


const List = () => {
    
    const { data, error, isLoading } = useGetItemsQuery()
    const [ createItem, { isLoading: isCreating } ] = useCreateItemMutation()

    // console.log(data, error, isLoading)

    const handleCreateRandom = async() => {
        try{
            const randomItem = generateRandomItem()
            await createItem(randomItem).unwrap()
        } catch(err) {
            console.error(err)
        }
    }

    // if (isLoading) return <div className="items-center flex justify-center"><LoadingSpinner /></div>
    if (error) return <p>Возникла ошибка</p>
    return(
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2 px-2">
                <h1 className="text-3xl font-bold ">Мои объявления</h1>
                <Button
                    onClick={handleCreateRandom}
                    disabled={isCreating}
                    variant="contained"
                >
                    Создать случайное объявление
                </Button>
            </div>
            {isLoading && <div className="items-center flex justify-center"><LoadingSpinner /></div>}
            {data && <AdsList adsList={data}/>}
        </div>
    )
}

export default List