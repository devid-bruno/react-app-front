import { api } from '../libs'
import { toast, mountQueryParams } from '../utils'

import { getOptions } from '../utils/api'

import { User } from '../types/users'

type UserFilters = {
    username?: string 
    email?: string
}

type FetchUsersRequest = {
    limit?: number
    page?: number
    filters: UserFilters
}

type FetchUsersResponse = {
    total: number | undefined,
    data: Array<User>
}

type AlterUserRoleRequest = {
    userId: number
    roleId: number
}

type AlterUserStatusRequest = {
    userId: number
    statusId: number
}

export const fetchUsers = async (request: FetchUsersRequest) => {
    try{
        const { limit, page, filters } = request
       
        const {
            username,
            email,
        } = filters
       
        // @ts-ignore
        const offset = page === '1'? 0: Number(limit) * (Number(page) - 1)

        const { data } = await api.get(
            '/users/?'
            + mountQueryParams('limit', limit)
            + mountQueryParams('offset', offset)    
            + mountQueryParams('username', username)    
            + mountQueryParams('email', email)
        )

        return data as FetchUsersResponse
    }catch(error){
        toast.messsage('500')
    }
}

export const trashUser = async (id: number) => {
    try {
        await api.delete(`users/${id}`)
    }catch(error){
        toast.messsage('500')
    }
}

export const fetchUser = async (id: number) => {
    try{

        const { data } = await api.get(`/users`)

        return data as User
    }catch(error){
        toast.messsage('500')
    }
}

export const fetchRoles = async () => {
    try{
        return getOptions('/roles')
    }catch(error){
        toast.messsage('500')
    }
}


export const alterUserRole = async (request: AlterUserRoleRequest) => {
    const { userId, roleId } = request
    try {
        const { data } = await  api.put(`/users/${userId}/roles`, { 
            roleId
        })

        return data
    }catch(error){
        toast.messsage('500')
    }
}

export const fetchUsersStatuses = async () => {
    try{
        return getOptions('/users/statuses')
    }catch(error){
        toast.messsage('500')
    }
}

export const alterUserStatus = async (request: AlterUserStatusRequest) => {
    const { userId,  statusId } = request

    try {
        const { data } = await  api.put(`/users/${userId}/statuses`, { 
            statusId
        })

        return data
    }catch(error){
        toast.messsage('500')
    }
}

export const storeAdminUser = async (values: any) => {
    try{
        const { data } = await api.post('/users/me', values)

        return data
    }catch(error: any){
        if(error?.response?.status !== 500){
            throw error.response.data
       }else{
            toast.messsage('500')
       }
    }
}


export const storeFiles = async (files: any) => {
    try{
        const { data } = await api.post('/checkar', files)

        return data
    }catch(error: any){
        if(error?.response?.status !== 500){
            throw "Error em checkar o arquivo"
       }else{
            toast.messsage('500')
       }
    }
}