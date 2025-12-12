import { Button, ButtonGroup } from "@chakra-ui/react"
import { useTheme } from '@app/providers/theme'

const Item = () => {
    const { theme, toggleTheme } = useTheme()
    return(
        <div>
                <Button onClick={toggleTheme} marginLeft="10" bg="gray.500" color="primaryFg" _hover={{ bg: "accent" }}>Click me</Button>
        </div>
    )
}

export default Item