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
                <Tabs.List bg="tabsBg" rounded="l3" p="1" gap="1">
                    <Tabs.Trigger 
                        value="members" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <DirectionsCarIcon sx={{ fontSize: 20 }}/>
                        <Text>Авто</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="projects" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <HomeIcon sx={{ fontSize: 20 }}/>
                        <Text>Недвижимость</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="tasks" 
                        color="tabsText" 
                        _selected={{ color: "tabsActiveText" }}
                        px="4"
                        py="2"
                    >
                        <ServicesIcon sx={{ fontSize: 20 }}/>
                        <Text>Услуги</Text>
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" bg="tabsIndicator" boxShadow="sm" />
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