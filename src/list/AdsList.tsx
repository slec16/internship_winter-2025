import AdsCard from "./AdsCard"
import type { Item } from "../types/items"


const AdsList = ({adsList}: {adsList: Item[]}) => {

    console.log(adsList)

    return(
        // <div className="flex flex-row flex-wrap justify-center gap-5">
        <div className="container mx-auto px-2 py-4">
            {adsList.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg">Объявлений пока нет</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adsList && adsList.map(ads => {
                    return(
                        <AdsCard item={ads}/>
                    )
                })}
            </div>
        </div>
    )
}

export default AdsList