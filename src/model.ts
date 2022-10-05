export interface ICollectionWords {
    _id: string
    collId: string
    words: [
        {
            eng: string
            rus: string
            _id: string
    }
    ]
}

export interface IRandom {
    collectionId: string
    eng: string
    rus: string
    wordId: string
}

export interface ICollection {
    _id: string
    name: string
    userId: string
}


export interface IArrWord {
    eng: string
    rus: string
    number: number
}