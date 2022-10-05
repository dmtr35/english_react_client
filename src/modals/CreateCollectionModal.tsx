import React, { useState, FC } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form, Row, Col } from 'react-bootstrap'
import { createCollection, createFromFile } from '../http/collectionApi'
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'
import InstructionModal from './InstructionModal'
import { useDispatch } from 'react-redux'
import { setIsLoadCollectionsPayload, setMenuCollPayload, setMenuWordPayload } from '../store/collectionsReducer'
import { IArrWord } from '../model'


interface CreateCollectionModalProps {
    show: boolean
    onHide: () => void
}

const CreateCollectionModal: FC<CreateCollectionModalProps> = ({ show, onHide }) => {
    const dispatch = useDispatch()
    const setIsLoadColleltions = (value: any) => { dispatch(setIsLoadCollectionsPayload(value)) }
    const setMenuColl = (value: any) => { dispatch(setMenuCollPayload(value)) }
    const setMenuWord = (value: any) => { dispatch(setMenuWordPayload(value)) }

    const [name, setName] = useState<string>('')
    const [arrWord, setArrWord] = useState<IArrWord[]>([])
    const [file, setFile] = useState<any>(null)
    const [instructionsVisible, setInstructionsVisible] = useState<boolean>(false)
    const userId = localStorage.getItem('userId')

    const addWord = () => {
        setArrWord([...arrWord, { eng: '', rus: '', number: Date.now() }])
    }
    const removeWord = (number: number) => {
        setArrWord(arrWord.filter(i => i.number !== number))
    }
    const changeWord = (key: any, value: any, number: any) => {
        setArrWord(arrWord.map((i: IArrWord) => i.number === number ? { ...i, [key]: value } : i))
    }
    const selectFile = (e: any) => {
        setFile(e.target.files[0])
    }

    const addCollection = () => {
        if (!name) {
            onHide()
            setMenuColl('')
            setMenuWord('')
            setArrWord([])
            return
        }
        const filterArrWord = arrWord.filter((word) => word.eng && word.rus)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('filterArrWord', JSON.stringify(filterArrWord))
        formData.append('file', file)
        if (!file) {
            createCollection(userId, formData)
                .then(data => onHide())
                .then(data => setIsLoadColleltions(true))
                .then(data => setName(''))
                .then(data => setArrWord([]))
                .then(data => setMenuColl(''))
                .then(data => setMenuWord(''))
        } else {
            createFromFile(userId, formData)
                .then(data => onHide())
                .then(data => setIsLoadColleltions(true))
                .then(data => setName(''))
                .then(data => setFile(null))
                .then(data => setArrWord([]))
                .then(data => setMenuColl(''))
                .then(data => setMenuWord(''))
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
                    Добавить новую колекцию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className='mt-3'
                        placeholder="Введите название колекции"
                    />
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
                        Добавить слова
                    </Button>
                    {arrWord.map(i =>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.eng}
                                    className='word'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeWord('eng', e.target.value, i.number)}
                                    placeholder={'Введите слово'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.rus}
                                    className='word'
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
                <Button variant="outline-success" onClick={addCollection}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default CreateCollectionModal



