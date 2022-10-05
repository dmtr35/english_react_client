import React, {FC} from 'react'
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from 'react-redux'
import { setModalDelTimeoutPayload } from '../store/collectionsReducer'

interface ModalDivDeleteCollProps {
    collId: string
    cancelDeleteColl: number
}


const ModalDivDeleteColl: FC<ModalDivDeleteCollProps> = ({ collId, cancelDeleteColl }) => {
    const dispatch = useDispatch()
    const modalDelTimeout = useSelector((state: any) => state.collectionsReducer.modalDelTimeout)
    const setModalDelTimeout = (value: any) => { dispatch(setModalDelTimeoutPayload(value)) }



    const cancelDell = (collId: string) => {
        clearTimeout(cancelDeleteColl)
        setModalDelTimeout(modalDelTimeout.filter((i: any) => i !== collId))
    }

    return (
        <>
            {modalDelTimeout.includes(collId)
                ?
                <Button className="button modal_del_timeout"
                    onClick={() => cancelDell(collId)}
                    variant="primary"
                    size="lg"
                >Отменить</Button>
                :
                null
            }
        </>
    )
}


export default ModalDivDeleteColl



