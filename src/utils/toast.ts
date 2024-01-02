import { toast } from 'react-toastify';


type Status = '200' | '400' | '401' | '404' | '500'

export function messsage(status?: Status, message?: string) {
    const loadErrors: any = {
        200() {
            toast.success(message)
        },
        400(){
            toast.warn(message)
        },
        401(){
            toast.warn(message || 'Credenciais inválidas!')
        },
        404(){
            toast.warn(message || 'Não encontrado!')
        },
        500(){
            toast.error(message || 'Ocorreu um erro inesperado no sistema.')
        }
    }
    
    if(!loadErrors[status as string]) return toast.error('Ocorreu um erro inesperado no sistema.')

    loadErrors[status as string]()
}