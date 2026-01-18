import { Input, InputGroup, CloseButton } from "@chakra-ui/react"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { useDebounce } from "@/shared/lib/useDebounce"
import { LuSearch } from "react-icons/lu"
import { useEffect, useRef, useState } from "react"

const Search = () => {
    const { searchQuery, setSearchQuery } = useQueryParams()
    const [localValue, setLocalValue] = useState(searchQuery || "")
    const inputRef = useRef<HTMLInputElement | null>(null)
    const debouncedValue = useDebounce(localValue)

    useEffect(() => {
        setLocalValue(searchQuery)
    }, [searchQuery])
    
    useEffect(() => {
        setSearchQuery(debouncedValue)
    }, [debouncedValue, setSearchQuery])

    const clearHandler = () => {
        setLocalValue("")
        inputRef.current?.focus()
    }

    const endElement = localValue ? (
        <CloseButton
            size="xs"
            onClick={clearHandler}
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
                    value={localValue}
                    onChange={(e) => { setLocalValue(e.currentTarget.value) }}
                />
            </InputGroup>
        </>
    )
}

export default Search