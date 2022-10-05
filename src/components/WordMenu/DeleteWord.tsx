import React, {FC} from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteWord } from '../../http/collectionApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuWordPayload, setRandomListWordsPayload } from '../../store/collectionsReducer'
import { IRandom } from '../../model'



interface DeleteWordProps {
    collId: string
    wordId: string
}



const DeleteWord: FC<DeleteWordProps> = ({wordId, collId}) => {
    const dispatch = useDispatch()
    const menuWord = useSelector((state: any) => state.collectionsReducer.menuWord)
    const randomListWords = useSelector((state: any) => state.collectionsReducer.randomListWords)
    const activeTurnWords = useSelector((state: any) => state.collectionsReducer.activeTurnWords)
    const setMenuWord = (value: any) => { dispatch(setMenuWordPayload(value)) }
    const setRandomListWords = (value: any) => { dispatch(setRandomListWordsPayload(value)) }



    const delWord = ({wordId, collId}: {wordId: string, collId: string}) => {
        deleteWord(wordId, collId)
        setRandomListWords(randomListWords.filter((i: IRandom) => i.wordId !== (wordId)))
        if (menuWord.includes(wordId)) {
            setMenuWord('')
        }
    }



    return (
        <div>
            <>
                {activeTurnWords.includes(wordId)
                    ?
                    <AiOutlineDelete
                        className="imageMemu"
                        style={{ color: '#fff' }}
                        onClick={() => delWord({wordId, collId})}
                    />
                    :
                    <AiOutlineDelete
                        className="imageMemu"
                        style={{ color: '#000' }}
                        onClick={() => delWord({wordId, collId})}
                    />
                }
            </>
        </div>
    )
}



export default DeleteWord
