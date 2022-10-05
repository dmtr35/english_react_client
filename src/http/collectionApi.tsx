import { $authHost, $host } from "./index"
import { ICollectionWords, ICollection } from "../model"


export const createCollection = async (id: any, formData: any) => {
    const response = await $host.post<ICollection[]>(`collections/createCollections/${id}`, formData)
    return response
}

export const createFromFile = async (id: any, formData: any) => {
    const { data } = await $host.post<ICollection[]>(`collections/createFromFile/${id}`, formData)
    return data
}

export const getCollections = async (id: any) => {
    const { data } = await $authHost.get<ICollection[]>(`collections/getCollections/${id}`)
    return data
}
export const getWords = async (collId: any) => {
    const response = await $authHost.post<ICollectionWords[]>(`words/getWords/`, { collId })
    return response.data
}

export const addWords = async (id: any, formData: any) => {
    const { data } = await $host.post<ICollectionWords[]>(`words/addWorlds/${id}`, formData)
    return data
}
export const addWordsFromFile = async (id: any, formData: any) => {
    const { data } = await $host.post<ICollectionWords[]>(`words/addWordsFromFile/${id}`, formData)
    return data
}




export const deleteCollection = async (id: any) => {
    const { data } = await $host.delete(`collections/deleteOneCollection/${id}`)
    return data
}
export const deleteWord = async (wordId: any, id: any) => {
    const response = await $host.post(`words/deleteOneWord/${id}`, { wordId })
    return response.data.wordId
}
export const deleteManyCollection = async (arrCollId: any) => {
    const { data } = await $host.post(`collections/deleteManyCollection/`, { arrCollId })
    return data
}


export const editCollection = async (id: any, name: any) => {
    const { data } = await $host.post(`collections/updateCollection/${id}`, { name })
    return data
}
export const editWord = async (id: any, arrWords: any) => {
    const { data } = await $host.post(`words/updateWords/${id}`, arrWords)
    return data
}


export const deleteAndMove = async (transferWord: any, currentCollId: any, wordId: any, arrWord: any) => {
    const { data } = await $host.post(`words/deleteAndMove/${transferWord}`, { currentCollId, wordId, arrWord })
    return data
}



