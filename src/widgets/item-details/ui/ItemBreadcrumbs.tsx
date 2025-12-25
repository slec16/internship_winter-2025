import {
    Breadcrumb,
} from "@chakra-ui/react"
import type { Item, PropertyItem, AutoItem, ServiceItem, ItemType } from "@/shared/types/items"
import { expToString } from "@/entities/item"

interface ItemBreadcrumbsProps {
    item: Item
}

const typeNameToFilterType = new Map<ItemType, string>([
    ['Недвижимость', 'property'],
    ['Авто', 'auto'],
    ['Услуги', 'service'],
])

const ItemBreadcrumbs = (props: ItemBreadcrumbsProps) => {

    const { item } = props

    const generateBreadcrumbs = () => {
        const crumbs = [
            <Breadcrumb.Item key="home">
                <Breadcrumb.Link href="/" color="secondaryText">Главная</Breadcrumb.Link>
            </Breadcrumb.Item>,
            <Breadcrumb.Separator key="sepHome" />,
            <Breadcrumb.Item key="itemType">
                <Breadcrumb.Link href={`/list?filterType=${typeNameToFilterType.get(item.type)}`} color="secondaryText">{item.type}</Breadcrumb.Link>
            </Breadcrumb.Item>,
        ]

        if (item.type === 'Недвижимость') {
            const propertyItem = item as PropertyItem
            crumbs.push(
                <Breadcrumb.Separator key="sep1" />,
                <Breadcrumb.Item key="propertyType">
                    <Breadcrumb.Link href={`/list?filterType=property&propertyTypes=${propertyItem.propertyType}`} color="secondaryText">{propertyItem.propertyType}</Breadcrumb.Link>
                </Breadcrumb.Item>,
                <Breadcrumb.Separator key="sep2" />,
                <Breadcrumb.Item key="rooms">
                    <Breadcrumb.Link href={`/list?filterType=property&propertyTypes=${propertyItem.propertyType}&rooms=${propertyItem.rooms}`} color="secondaryText">{propertyItem.rooms} {propertyItem.rooms === 1 ? 'комната' : propertyItem.rooms < 5 ? 'комнаты' : 'комнат'}</Breadcrumb.Link>
                </Breadcrumb.Item>
            )
        } else if (item.type === 'Авто') {
            const autoItem = item as AutoItem
            crumbs.push(
                <Breadcrumb.Separator key="sep1" />,
                <Breadcrumb.Item key="brand">
                    <Breadcrumb.Link href={`/list?filterType=auto&brand=${autoItem.brand}`} color="secondaryText">{autoItem.brand}</Breadcrumb.Link>
                </Breadcrumb.Item>,
                <Breadcrumb.Separator key="sep2" />,
                <Breadcrumb.Item key="model">
                    <Breadcrumb.Link href={`/list?filterType=auto&brand=${autoItem.brand}&model=${autoItem.model}`} color="secondaryText">{autoItem.model}</Breadcrumb.Link>
                </Breadcrumb.Item>
            )
        } else if (item.type === 'Услуги') {
            const serviceItem = item as ServiceItem
            crumbs.push(
                <Breadcrumb.Separator key="sep1" />,
                <Breadcrumb.Item key="serviceType">
                    <Breadcrumb.Link href={`/list?filterType=service&serviceType=${serviceItem.serviceType}`} color="secondaryText">{serviceItem.serviceType}</Breadcrumb.Link>
                </Breadcrumb.Item>,
                <Breadcrumb.Separator key="sep2" />,
                <Breadcrumb.Item key="experience">
                    <Breadcrumb.Link href={`/list?filterType=service&serviceType=${serviceItem.serviceType}&experience=${expToString(serviceItem.experience)}`} color="secondaryText">{serviceItem.experience} {serviceItem.experience === 1 ? 'год опыта' : serviceItem.experience < 5 ? 'года опыта' : 'лет опыта'}</Breadcrumb.Link>
                </Breadcrumb.Item>
            )
        }

        crumbs.push(
            <Breadcrumb.Separator key="sep3" />,
            <Breadcrumb.Item key="name">
                <Breadcrumb.CurrentLink color="text">{item.name}</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
        )

        return crumbs
    }

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                {generateBreadcrumbs()}
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}

export default ItemBreadcrumbs