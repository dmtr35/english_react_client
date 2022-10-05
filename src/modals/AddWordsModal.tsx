import React, { useState, FC } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form, Row, Col } from 'react-bootstrap'
import { addWords, addWordsFromFile } from '../http/collectionApi'
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'
import InstructionModal from '../modals/InstructionModal'
import { useDispatch } from 'react-redux'
import { setIsLoadCollectionsPayload, setMenuCollPayload } from '../store/collectionsReducer'
import { IArrWord } from '../model'

interface AddWordsModalProps {
    collId: string
    show: boolean
    onHide: () => void
}


const AddWordsModal: FC<AddWordsModalProps> = ({ collId, show, onHide }) => {
    const dispatch = useDispatch()
    const setIsLoadColleltions = (value: boolean) => { dispatch(setIsLoadCollectionsPayload(value)) }
    const setMenuColl = (value: any) => { dispatch(setMenuCollPayload(value)) }


    const [arrWord, setArrWord] = useState<any>([])
    const [file, setFile] = useState<any>(null)
    const [instructionsVisible, setInstructionsVisible] = useState<boolean>(false)


    const addWord = () => {
        setArrWord([...arrWord, { eng: '', rus: '', number: Date.now() }])
    }
    const removeWord = (number: number) => {
        setArrWord(arrWord.filter((i: IArrWord) => i.number !== number))
    }
    const changeWord = (key: string, value: string, number: number) => {
        setArrWord(arrWord.map((i: IArrWord) => i.number === number ? { ...i, [key]: value } : i))
    }
    const selectFile = (e: any) => {
        setFile(e.target.files[0])
    }

    const addWordsParent = () => {
        const filterArrWord = arrWord.filter((word: IArrWord) => word.eng && word.rus)
        const formData = new FormData()
        formData.append('filterArrWord', JSON.stringify(filterArrWord))
        formData.append('file', file)
        if (!file && filterArrWord.length === 0) return (setMenuColl(''), onHide())
        if (!file) {
            addWords(collId, formData)
                .then(data => setArrWord([]))
                .then(data => setIsLoadColleltions(true))
                .then(data => setMenuColl(''))
                .then(data => onHide())
        } else {
            addWordsFromFile(collId, formData)
                .then(data => setFile(null))
                .then(data => setArrWord([]))
                .then(data => setIsLoadColleltions(true))
                .then(data => setMenuColl(''))
                .then(data => onHide())
        }
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
                    Добавить слова
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='div_file'>
                        <Form.Control
                            className='upload_file'
                            type="file"
                            onChange={selectFile}
                        />
                        <div className='instructions'>Инструкции</div>
                        <Image
                            onClick={() => { setInstructionsVisible(true) }}
                            className='image_info'
                            src={info}
                        />
                        <InstructionModal
                            show={instructionsVisible}
                            onHide={() => setInstructionsVisible(false)}
                        />
                    </div>
                    <p className='text_or'>Или</p>

                    <Button
                        variant={"outline-dark"}
                        onClick={addWord}
                    >
                        Добавить слово
                    </Button>
                    {arrWord.map((i: IArrWord) =>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    className=' word'
                                    value={i.eng}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeWord('eng', e.target.value, i.number)}
                                    placeholder={'Введите слово'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.rus}
                                    className=' word'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeWord('rus', e.target.value, i.number)}
                                    placeholder={'Введите перевод'}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeWord(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addWordsParent}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default AddWordsModal



