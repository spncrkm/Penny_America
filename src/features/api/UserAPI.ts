import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, ErrorResponse } from "../../interface/Users";

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),

    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => '/user'
        }),

        getOneUser: builder.query<User, number>({
            query: (id) => `/user/${id}`
        }),

        addUser: builder.mutation<User, Partial<User>>({
            query: (newProduct) =>  {
                console.log(newProduct)
                return {
                    url: '/user',
                    method: 'POST',
                    header: {'Content-Type': 'application/json'},
                    body: newProduct
                }
            } 
        }), 

        updateUser: builder.mutation<User, {id: number, updatedUser: Partial<User>}>({
            query: ({id, updatedUser}) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: updatedUser
            })
        }),
        
        deleteUser: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllUsersQuery, useGetOneUserQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = UserApi