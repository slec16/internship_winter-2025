import {
    Breadcrumb,
} from "@chakra-ui/react"

interface ItemBreadcrumbsProps {
    type: string,
    name: string
}

const ItemBreadcrumbs = (props: ItemBreadcrumbsProps) => {

    const { type, name } = props

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">Главная</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="#">{type}</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                    <Breadcrumb.CurrentLink>{name}</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}

export default ItemBreadcrumbs