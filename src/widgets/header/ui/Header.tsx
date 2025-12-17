import { Flex, Text, Button, IconButton, HStack } from '@chakra-ui/react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SunnyIcon from '@mui/icons-material/Sunny'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useTheme } from '@app/providers/theme'
import { useCreateItemMutation } from '@shared/api/itemsApi'
import generateRandomItem from '@/shared/lib/randomItem'

const Header = () => {

    const { theme, toggleTheme } = useTheme()
    const [ createItem, { isLoading: isCreating } ] = useCreateItemMutation()

    const handleCreateRandom = async() => {
        try{
            const randomItem = generateRandomItem()
            await createItem(randomItem).unwrap()
        } catch(err) {
            console.error(err)
        }
    }   

    return (
        <Flex as="header" w="full" justify="space-between" px={3} py={5}>
            <Text fontSize="4xl" fontWeight="bold" >Avito clone</Text>
            <HStack gap={2}>
                <IconButton 
                    aria-label="Toggle color mode" 
                    onClick={toggleTheme} 
                    variant="ghost" 
                    rounded="full"
                    size="lg"
                    color={theme === 'light' ? 'gray.700' : 'gray.300'}
                    _hover={{
                        bg: theme === 'light' ? 'gray.300' : 'gray.700',
                        color: theme === 'light' ? 'gray.900' : 'white',
                    }}
                >
                    {theme === 'light' ? <DarkModeIcon /> : <SunnyIcon />}
                </IconButton>
                <IconButton 
                    aria-label="Account"
                    variant="ghost" 
                    rounded="full"
                    size="lg"
                    color={theme === 'light' ? 'gray.700' : 'gray.300'}
                    _hover={{
                        bg: theme === 'light' ? 'gray.300' : 'gray.700',
                        color: theme === 'light' ? 'gray.900' : 'white',
                    }}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Button
                    onClick={handleCreateRandom}
                    variant="solid"
                    bg="buttonPrimary"
                    color="buttonPrimaryFg"
                    borderColor="buttonPrimary"
                    _hover={{
                        bg: "buttonPrimaryHover",
                    }}
                    disabled={isCreating}
                >
                    Разместить объявление
                </Button>
            </HStack>
        </Flex>
    )
}

export default Header