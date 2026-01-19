import { useState, useEffect } from "react"
import type { Item } from "@/shared/lib/schemas"
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const AdsPagination = ({ items }: { items: Item[] }) => {

    // console.log(items)
    const pageSize = 5
    const [page, setPage] = useState(1)

    const startRange = (page - 1) * pageSize
    const endRange = startRange + pageSize

    const visibleItems = items.slice(startRange, endRange)

    useEffect(() => {
        console.log(visibleItems)
    }, [visibleItems])

    return (
        <Pagination.Root 
            count={items.length}
            pageSize={pageSize}
            defaultPage={1}
            page={page}
            onPageChange={(e) => setPage(e.page)}
        >
            <ButtonGroup variant="ghost" size="sm" gap="1">
                <Pagination.PrevTrigger asChild>
                    <IconButton 
                        color="paginationColor"
                        _hover={{ 
                            bg: "buttonSecondary",
                            color: "paginationColor"
                        }}
                        _disabled={{ 
                            opacity: 0.4,
                            cursor: "not-allowed"
                        }}
                    >
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton 
                            variant={{ base: "ghost", _selected: "outline" }}
                            color="paginationColor"
                            _hover={{ 
                                bg: "buttonSecondary",
                                color: "paginationColor"
                            }}
                            _selected={{
                                bg: "primary",
                                color: "primaryFg",
                                borderColor: "primary",
                                _hover: {
                                    bg: "buttonPrimaryHover",
                                    borderColor: "buttonPrimaryHover"
                                }
                            }}
                        >
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton 
                        color="paginationColor"
                        _hover={{ 
                            bg: "buttonSecondary",
                            color: "paginationColor"
                        }}
                        _disabled={{ 
                            opacity: 0.4,
                            cursor: "not-allowed"
                        }}
                    >
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}

export default AdsPagination