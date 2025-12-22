export const formatValue = (key: string, value: unknown): string => {
    if (key === "price" || key === "cost") {
        return `${Number(value).toLocaleString("ru-RU")} ₽`
    }
    if (key === "area") {
        return `${value} м²`
    }
    if (key === "mileage") {
        return `${Number(value).toLocaleString("ru-RU")} км`
    }
    if (key === "experience") {
        return `${value} лет`
    }
    return String(value)
}