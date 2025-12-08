import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Item, CreateItem, UpdateItem } from '@shared/types/items'

const BASE_URL = '/api'

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Item'],
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => '/items',
            providesTags: ['Item']
        }),
        getItemById: builder.query<Item, number>({
            query: (id) => `/items/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Item', id}]
        }),
        createItem: builder.mutation<Item, CreateItem>({
            query: (body) => ({
                url: '/items',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Item']
        }),
        updateItem: builder.mutation<Item, UpdateItem>({
            query: ({id, ...body}) => ({
                url: `items/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (_result, _error, { id }) => [{type: 'Item', id}],
        }),
        deleteItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `/items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{type: 'Item', id}],
        })
    })
})

export const {
    useGetItemsQuery,
    useGetItemByIdQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApi