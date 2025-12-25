export const expToString = (years: number) => {
    if(years === 0) return "Без опыта"
    if(years >= 1 && years <= 3) return "1-3 года"
    if(years >= 3 && years <= 6) return "3-6 лет"
    if(years > 6) return "Более 6 лет"
}