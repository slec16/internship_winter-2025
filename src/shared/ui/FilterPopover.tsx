import { type ReactNode, useMemo } from 'react'
import Menu from '@mui/material/Menu'
import ClickAwayListener from '@mui/material/ClickAwayListener'


type FilterPopoverProps = {
    children: ReactNode
    type: 'button' | 'input' | 'range'
    id: string,
    icon: ReactNode,
    placeholder: string,
    isOpen: boolean
    value: string[]
    unit?: string // в чем измеряется значение( м², комн., ₽, etc.)
    anchorEl: HTMLElement | null
    onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
    onClose: () => void
}

const FilterPopover = (props: FilterPopoverProps) => {

    const { id, type, icon, placeholder, isOpen, anchorEl, value, onOpen, onClose } = props

    const menuId = isOpen ? `${id}-menu` : undefined

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isOpen) {
            onClose()
        } else {
            onOpen(event)
        }
    }
    const handleClose = () => onClose()

    const handleClickAway = () => {
        if (!isOpen) return
        onClose()
    }

    const display = useMemo(() => {
        switch (type) {
            case 'button':
                return value.join(', ')
            case 'input':
                return value
            case 'range':
                return [value[0] ? `от ${value[0]}` : '', value[1] ? `до ${value[1]}` : ''].filter(Boolean).join(' ').trim()
            default:
                return ''
        }
    }, [type, value])

    return (
        <>
            <button
                    aria-controls={menuId}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={handleClick}
                    className='hover:bg-gray-200 border border-transparent dark:hover:bg-slate-900 p-2 aria-expanded:border-gray-700 rounded-md'
                >
                    <label className="flex flex-row items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                        {icon}
                        <input
                            placeholder={placeholder}
                            value={display}
                            readOnly
                            className="w-48 rounded-md bg-transparent px-3 text-gray-900 placeholder-gray-400 outline-none border-0 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                        />
                    </label>
                </button>
            <Menu
                id={menuId}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    root: {
                        style: { pointerEvents: 'none' },
                    },
                    paper: {
                        sx: {
                            pointerEvents: 'auto',
                            mt: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 8px 18px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.12)',
                            '.dark &': {
                                boxShadow: '0 14px 28px rgba(0,0,0,0.7), 0 6px 14px rgba(0,0,0,0.6)',
                            },
                        },
                    },
                }}
            >
                <ClickAwayListener onClickAway={handleClickAway} >
                    <div className='p-5 flex flex-row items-center gap-2 bg-white dark:bg-gray-900'>
                        {props.children}
                    </div>
                </ClickAwayListener>
            </Menu>
        </>
    )
}

export default FilterPopover