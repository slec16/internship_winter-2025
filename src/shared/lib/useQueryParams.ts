import { useSearchParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react'

/**
 * Хук для работы с query параметрами URL
 * Предоставляет удобные методы для чтения и записи параметров поиска
 */
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  /**
   * Получить значение параметра по ключу
   */
  const getParam = useCallback((key: string): string => {
    return searchParams.get(key) || ''
  }, [searchParams])

  /**
   * Установить значение параметра
   */
  const setParam = useCallback((key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      if (value.trim()) {
        newParams.set(key, value.trim())
      } else {
        newParams.delete(key)
      }
      return newParams
    })
  }, [setSearchParams])

  /**
   * Удалить параметр
   */
  const deleteParam = useCallback((key: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete(key)
      return newParams
    })
  }, [setSearchParams])

  /**
   * Получить строку поиска (параметр 'q')
   */
  const searchQuery = useMemo(() => getParam('q'), [getParam])

  /**
   * Установить строку поиска (параметр 'q')
   */
  const setSearchQuery = useCallback((value: string) => {
    setParam('q', value)
  }, [setParam])

  return {
    // Общие методы
    getParam,
    setParam,
    deleteParam,
    
    // Специализированные методы для поиска
    searchQuery,
    setSearchQuery,
    
    // Прямой доступ к searchParams для расширенного использования
    searchParams,
    setSearchParams,
  }
}

