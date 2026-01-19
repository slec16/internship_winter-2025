import { z } from "zod"

// const numericField = (validations: (shema: z.ZodNumber) => z.ZodNumber = (s) => s) => 
//     z.union([z.string(), z.number()])
//         .transform((val) => (val === '' ? NaN : Number(val)))
//         .pipe(validations(z.number()))

const numericField = (validations: (schema: z.ZodNumber) => z.ZodNumber = (s) => s) =>
    z.preprocess(
        (val) => (val === '' ? NaN : Number(val)),
        validations(z.number())
    )

export const itemTypeSchema = z.enum(["Недвижимость", "Авто", "Услуги"])

export const baseItemSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Название обязательно для заполнение"),
    description: z.string().min(1, "Описание обязательно для заполнение").min(10, "Описание должно быть не менее 10 символов").max(1000, "Описание не может быть больше 1000 символов"),
    location: z.string().min(1, "Локация обязательная для заполнения"),
    type: itemTypeSchema,
    image: z.array(z.url("Некорректный URL изображения")).optional()
})

export const propertyItemSchema = baseItemSchema.extend({
    type: z.literal("Недвижимость"),
    propertyType: z.string().min(1, "Тип недвижимости обязателен для заполнения"),
    area: z.coerce.number().positive("Площадь должна быть положительным числом"),
    rooms: z.coerce.number().int("Количество комнат должно быть целым числом").positive("Количество комнат должно быть положительным числом"),
    price: z.coerce.number().nonnegative("Цена не может быть отрицательной")
})

export const autoItemSchema = baseItemSchema.extend({
    type: z.literal("Авто"),
    brand: z.string().min(1, "Марка обязательна для заполнения"),
    model: z.string().min(1, "Модель обязательна для заполнения"),
    year: z.coerce.number().int("Год должен быть целым числом").min(1900, "Год должен быть не ранее 1900").max(new Date().getFullYear() + 1, "Год не можеть быть больше текущего"),
    mileage: z.coerce.number().positive("Пробег должен быть положительным").optional()
})

export const serviceItemSchema = baseItemSchema.extend({
    type: z.literal("Услуги"),
    serviceType: z.string().min(1, "Тип услуги обязателен для заполнения"),
    experience: z.coerce.number().nonnegative("Опыт не может быть отрицательным"),
    cost: z.coerce.number().nonnegative("Цена не может быть отрицательной"),
    workShedule: z.string().optional()
})

export const itemSchema = z.discriminatedUnion("type", [
    propertyItemSchema,
    autoItemSchema,
    serviceItemSchema
])

// схема для первого шага
export const commonFormSchema = z.object({
    name: z.string().min(1, "Название обязательно для заполнения"),
    description: z.string().min(1, "Описание обязательно для заполнение").min(10, "Описание должно быть не менее 10 символов").max(1000, "Описание не может быть больше 1000 символов"),
    location: z.string().min(1, "Локация обязательная для заполнения"),
    image: z.array(z.object({
        id: z.string(),
        url: z.url("Некорректный URL изображения").min(1, "URL не может быть пустым")
    })),
    type: itemTypeSchema
})

// схемы для второго шага
export const autoFormSchema = z.object({
    brand: z.string().min(1, "Марка обязательна для заполнения"),
    model: z.string().min(1, "Модель обязательна для заполнения"),
    year: numericField((n) => n.int("Год должен быть целым числом").min(1900, "Год должен быть не ранее 1900").max(new Date().getFullYear() + 1, "Год не можеть быть больше текущего")),
    mileage: numericField((n) => n.positive("Пробег должен быть положительным"))
})

export const propertyFormSchema = z.object({
    propertyType: z.string().min(1, "Тип недвижимости обязателен для заполнения"),
    area: numericField((n) => n.positive("Площадь должна быть положительным числом")),
    rooms: numericField((n) => n.int("Количество комнат должно быть целым числом").positive("Количество комнат должно быть положительным числом")),
    price: numericField((n) => n.nonnegative("Цена не может быть отрицательной"))
})

export const serviseFormSchema = z.object({
    serviceType: z.string().min(1, "Тип услуги обязателен для заполнения"),
    experience: numericField((n) => n.nonnegative("Опыт не может быть отрицательным")),
    cost: numericField((n) => n.nonnegative("Цена не может быть отрицательной")),
    workShedule: z.string().optional()
})

// типы из схем
export type ItemType = z.infer<typeof itemTypeSchema>
export type BaseItem = z.infer<typeof baseItemSchema>
export type PropertyItem = z.infer<typeof propertyItemSchema>
export type AutoItem = z.infer<typeof autoItemSchema>
export type ServiceItem = z.infer<typeof serviceItemSchema>
export type Item = z.infer<typeof itemSchema>

export type CommonFormData = z.infer<typeof commonFormSchema>
export type AutoFormData = z.infer<typeof autoFormSchema>
export type PropertyFormData = z.infer<typeof propertyFormSchema>
export type ServiceFormData = z.infer<typeof serviseFormSchema>

export type AutoFormInput = z.input<typeof autoFormSchema>
export type PropertyFormInput = z.input<typeof propertyFormSchema>
export type ServiceFormInput = z.input<typeof serviseFormSchema>

export type CreateAutoItem = Omit<AutoItem, 'id'>
export type CreatePropertyItem = Omit<PropertyItem, 'id'>
export type CreateServiceItem = Omit<ServiceItem, 'id'>
export type CreateItem = CreateAutoItem | CreatePropertyItem | CreateServiceItem

export type UpdateAutoItem = Partial<Omit<AutoItem, 'id'>>& {id: number}
export type UpdatePropertyItem = Partial<Omit<PropertyItem, 'id'>>& {id: number}
export type UpdateServiceItem = Partial<Omit<ServiceItem, 'id'>>& {id: number}
export type UpdateItem = UpdateAutoItem | UpdatePropertyItem | UpdateServiceItem
