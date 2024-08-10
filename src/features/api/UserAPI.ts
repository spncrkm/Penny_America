import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, ErrorResponse } from "../../interface/Users";

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),

    endpoints: (builder) => ({

        addUser: builder.mutation<User, Partial<User>>({
            query: (addUser) =>  {
                console.log(addUser)
                return {
                    url: '/api/v0/accounts/register',
                    method: 'POST',
                    header: {'Content-Type': 'application/json'},
                    body: addUser
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

export const { useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = UserApi