import React, { useState, FC } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form } from 'react-bootstrap'
import { editCollection } from '../http/collectionApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuCollPayload } from '../store/collectionsReducer'
import { ICollection } from '../model'



interface EditCollectionModalProps {
    collId: string
    collName: string
    show: boolean
    onHide: () => void
}

const EditCollectionModal: FC<EditCollectionModalProps> = ({ collId, show, onHide, collName }) => {
    const dispatch = useDispatch()
    const setMenuColl = (value: any) => { dispatch(setMenuCollPayload(value)) }
    const collections = useSelector((state: any) => state.collectionsReducer.collections)


    const [name, setName] = useState<string>(`${collName}`)
    
    
    const editColl = () => {
        if (name.trim() === collName.trim())  return (onHide(), setMenuColl(''))
        if (!name.trim()) return (onHide(), setMenuColl(''))
        editCollection(collId, name)
        onHide()
        setMenuColl('')
        const index = collections.findIndex((el: ICollection) => el._id === collId)
        collections[index].name = name
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить название колекции
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className='word'
                        placeholder="Введите название колекции"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editColl}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default EditCollectionModal



