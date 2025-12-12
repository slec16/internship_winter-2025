import AutoFilter from "./AutoFilter"
import PropertyFilter from "./PropertyFilter"
import ServiceFilter from "./ServiceFilter"
import { Tabs, Text } from "@chakra-ui/react"
import HomeIcon from '@mui/icons-material/Home'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ServicesIcon from '@mui/icons-material/Build'

const AdsFilter = () => {

    return (
        <>
            <Tabs.Root defaultValue="members" variant="plain" w="fit">
                <Tabs.List bg="accent" color="text" rounded="l3" p="1">
                    <Tabs.Trigger value="members">
                        <DirectionsCarIcon/>
                        <Text color="text">Авто</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="projects">
                        <HomeIcon />
                        <Text color="text">Недвижимость</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="tasks">
                        <ServicesIcon />
                        <Text color="text">Услуги</Text>
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" />
                </Tabs.List>
                <Tabs.Content value="members">
                    <AutoFilter />
                </Tabs.Content>
                <Tabs.Content value="projects">
                    <PropertyFilter />
                </Tabs.Content>
                <Tabs.Content value="tasks">
                    <ServiceFilter />
                </Tabs.Content>
            </Tabs.Root>
        </>
    )
}

export default AdsFilter