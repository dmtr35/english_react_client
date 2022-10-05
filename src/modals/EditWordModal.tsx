import React, { useState, FC } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Dropdown, Form } from 'react-bootstrap'
import { editWord, deleteAndMove } from '../http/collectionApi'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuWordPayload } from '../store/collectionsReducer'
import { IRandom, ICollection } from '../model'


interface EditWordModalProps {
    currentCollId: string
    wordId: string
    engW: string
    rusW: string
    show: boolean
    onHide: () => void
}

const EditWordModal: FC<EditWordModalProps> = ({ currentCollId, wordId, show, onHide, engW, rusW }) => {
    const dispatch = useDispatch()
    const setMenuWord = (value: any) => { dispatch(setMenuWordPayload(value)) }
    const collections = useSelector((state: any) => state.collectionsReducer.collections)
    const randomListWords = useSelector((state: any) => state.collectionsReducer.randomListWords)


    const [eng, setEng] = useState<string>(`${engW}`.trim())
    const [rus, setRus] = useState<string>(`${rusW}`.trim())
    const [titleDropdown, setTitleDropdown] = useState<string>('Переместить в другую колекцию')
    const [transferWord, setTransferWord] = useState<string>('')




    const editWordParent = () => {
        if (!eng.trim() || !rus.trim()) return (onHide(), setMenuWord(''))
        const arrWord = [{ 'eng': `${eng}`, 'rus': `${rus}`, '_id': `${wordId}` }]

        if (titleDropdown === 'Переместить в другую колекцию') {
            if (eng.trim() === engW && rus.trim() === rusW) return (onHide(), setMenuWord(''))
            editWord(wordId, arrWord)
                .then(() => onHide())
                .then(() => setMenuWord(''))

            const index = randomListWords.findIndex((el: IRandom) => el.wordId === wordId)
            randomListWords[index].eng = eng
            randomListWords[index].rus = rus
        } else {
            deleteAndMove(transferWord, currentCollId, wordId, arrWord)
                .then(() => onHide())
                .then(() => setMenuWord(''))

            const index = randomListWords.findIndex((el: IRandom) => el.wordId === wordId)
            randomListWords[index].eng = eng
            randomListWords[index].rus = rus
            randomListWords[index].collectionId = transferWord
        }
    }

    const titleAndWordId = (collId: string, collName: string) => {
        setTitleDropdown(collName)
        setTransferWord(collId)
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
                    Изменить слова
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={eng}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEng(e.target.value)}
                        className='mt-3'
                        placeholder="Введите слово"
                    />
                    <Form.Control
                        value={rus}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRus(e.target.value)}
                        className='mt-3'
                        placeholder="Введите перевод"
                    />
                    <hr />
                    <InputGroup className="mb-3 dropdown_move">
                        <DropdownButton
                            title={titleDropdown}
                        >
                            {collections
                                .filter((data: ICollection) => data._id !== currentCollId)
                                .map((data: ICollection) =>
                                    <Dropdown.Item
                                        key={data._id}
                                        className="dropdown_move"
                                        href="#"
                                        onClick={() => titleAndWordId(data._id, data.name)}
                                    >
                                        {data.name}
                                    </Dropdown.Item>
                                )}
                        </DropdownButton>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editWordParent}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default EditWordModal



