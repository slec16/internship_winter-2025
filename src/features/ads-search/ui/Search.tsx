import { Input, InputGroup, CloseButton } from "@chakra-ui/react"
// import SearchIcon from '@mui/icons-material/Search'
import { LuSearch } from "react-icons/lu"
import { useRef, useState } from "react"

const Search = () => {

    const [value, setValue] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const endElement = value ? (
        <CloseButton
            size="xs"

            onClick={() => {
                setValue("")
                inputRef.current?.focus()
            }}
            me="-2"
        />
    ) : undefined

    return (
        <>
            <InputGroup
                startElement={<LuSearch />}
                endElement={endElement}
                mb="2"
            >
                <Input
                    ref={inputRef}
                    placeholder="Поиск..."
                    value={value}
                    onChange={(e) => { setValue(e.currentTarget.value) }}
                />
            </InputGroup>
        </>
    )
}

export default Search