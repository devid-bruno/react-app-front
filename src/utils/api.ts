import { api } from '../libs'

export const getOptions = async (url: string) => {
    const { data } =  await api.get(url)
        
    const options =  data.map((item: any) => ({
        label: item.name,
        value: item.id
    }))

    return options
}