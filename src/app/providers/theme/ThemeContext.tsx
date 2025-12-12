// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { system } from './theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { Theme, ThemeContextType, ThemeProviderProps } from '@shared/types/theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, defaultTheme = 'light' } = props
    
   const [theme, setThemeState] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme) return savedTheme
        
        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefersDark) return 'dark'
        }
        
        return defaultTheme
    })


    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            setThemeState(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [])

    const toggleTheme = () => {
        setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    const value: ThemeContextType = {
        theme,
        toggleTheme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            <ChakraProvider value={system}>
                {children}
            </ChakraProvider>
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}