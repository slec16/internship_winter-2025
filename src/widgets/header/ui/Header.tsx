import { Link, useNavigate } from "react-router-dom"
import { Flex, Text, Button, IconButton, HStack } from '@chakra-ui/react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SunnyIcon from '@mui/icons-material/Sunny'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// TODO: неправильно по уровням
import { useTheme } from '@app/providers/theme'

const Header = () => {

    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()
    

    return (
        <Flex as="header" w="full" justify="space-between" px={3} py={5}>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Text fontSize="4xl" fontWeight="bold" _hover={{color:"accent"}}>Avito clone</Text>
            </Link>
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
                    onClick={() => navigate("/form")}
                    variant="solid"
                    bg="buttonPrimary"
                    color="buttonPrimaryFg"
                    borderColor="buttonPrimary"
                    _hover={{
                        bg: "buttonPrimaryHover",
                    }}
                >
                    Разместить объявление
                </Button>
            </HStack>
        </Flex>
    )
}

export default Header