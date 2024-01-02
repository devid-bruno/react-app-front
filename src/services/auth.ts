import { destroyCookie, setCookie } from "nookies"
import { api } from '../libs'
import { toast } from '../utils'

type Login = {
    email: string
    password: string
}

export async function login (payload: Login){
    try{
        const { email, password } = payload

        const { data }: any = await api.post('/auth', {
            email,
            password
        })

        setCookie(undefined, "bb.token", data?.accessToken, {
            maxAge: 60 * 60 * 24 * 30, 
        })

        api.defaults.headers.common['Authorization'] = `Bearer  ${data?.accessToken}`

        setCookie(undefined, "bb.user", JSON.stringify(data), {
            maxAge: 60 * 60 * 24 * 30, 
        })

        setCookie(undefined, "bb.activeMenuItem", "Início")


        console.log(data)
        return data
    }catch(error: any){
        console.log("error", error)
        if(error?.response?.status !== 500){
            throw error.response.data.message
        }else{
            toast.messsage('500');
        }
    }
}

export async function logout() {
    destroyCookie(undefined, "bb.token")
    destroyCookie(undefined, "bb.user")
    window.location.reload()
}