import React, {FC} from "react"
import { deleteCollection } from "../../http/collectionApi"
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuCollPayload, setCancelDeleteCollPayload, setCollectionsPayload, setRandomListWordsPayload, setModalDelTimeoutPayload } from '../../store/collectionsReducer'
import { IRandom, ICollection } from '../../model'


interface TimeoutCollectionDeleteProps {
    collId: string
}

const TimeoutCollectionDelete: FC<TimeoutCollectionDeleteProps> = ({ collId }) => {
    const dispatch = useDispatch()
    const collections = useSelector((state: any) => state.collectionsReducer.collections)
    const randomListWords = useSelector((state: any) => state.collectionsReducer.randomListWords)
    const modalDelTimeout = useSelector((state: any) => state.collectionsReducer.modalDelTimeout)
    const setMenuColl = (value: any) => { dispatch(setMenuCollPayload(value)) }
    const setCancelDeleteColl = (value: any) => { dispatch(setCancelDeleteCollPayload(value)) }
    const setCollections = (value: any) => { dispatch(setCollectionsPayload(value)) }
    const setRandomListWords = (value: any) => { dispatch(setRandomListWordsPayload(value)) }
    const setModalDelTimeout = (value: any) => { dispatch(setModalDelTimeoutPayload(value)) }



    const deleteColl = (id: string) => {
        setMenuColl('')
        setModalDelTimeout([...modalDelTimeout, id])
        const timeoutId: any = setTimeout(() => {
            deleteCollection(id)
            setCollections(collections.filter((i: ICollection) => i._id !== (id)))
            setRandomListWords(randomListWords.filter((i: IRandom) => i.collectionId !== (id)))
            setModalDelTimeout(modalDelTimeout.filter((i: any) => i !== id))
        }, 2000)
        setCancelDeleteColl(timeoutId)
    }



    return (
        <>
            <AiOutlineDelete
                className="iconMenuColl"
                onClick={() => deleteColl(collId)}
            />
        </>
    )
}



export default TimeoutCollectionDelete



