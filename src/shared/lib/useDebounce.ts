import { useEffect, useState, useRef } from 'react'

export const useDebounce = <T>( value: T, delay: number = 300 ): T => {
    const [debouncedValue, setDebounceValue] = useState<T>(value)
    const timerRef = useRef<number | null>(null)
    
    useEffect(() => {
   
        if(timerRef.current) {
            window.clearTimeout(timerRef.current)
        }

        timerRef.current = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            if(timerRef.current) {
                window.clearTimeout(timerRef.current)
            }
        }

    }, [value, delay])

    return debouncedValue

}