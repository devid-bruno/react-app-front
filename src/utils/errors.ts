import { Iron } from '@mui/icons-material'
import { 
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    FIELD_EXISTS,
    INVALID_DATA } from '../consts/errors'

type Message = {
    message: string
}

type Props = {
    error: {
        type: string
        fields: []
    }
    setError: (error: string, { message }: Message) => void
}

export const displayError = ({ error, setError }: Props) => {
    if(error){
        if(error?.type === USER_NOT_FOUND){
            setError('email', { message: 'Usuário não encontrado.' })
        }

        if(error?.type === WRONG_PASSWORD){
            setError('password', { message: 'Senha inválida.' })
        }

        if(error?.type === FIELD_EXISTS){
            for(const field in error.fields){
                if(error.fields[field]){
                    setError(field, { message: 'Usuário já cadastrado com este campo' })                   
                }
            }
        }

        if(error?.type === INVALID_DATA){
            for(const field in error.fields){
                if(error.fields[field]){
                    const message = field.toUpperCase() === 'CPF' || field.toUpperCase() === 'CNPJ' ? `${field} inválido`: 'Campo inválido'

                    setError(field, { message })
                }
            }
        }

    }
}