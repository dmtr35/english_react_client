import React, { useEffect, useState, FC } from "react"
import { getCollections, deleteManyCollection } from "../http/collectionApi"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { handleChange, isCheckTrue } from "../utils/dopFunction"
import CreateCollectionModal from "../modals/CreateCollectionModal"
import { AiOutlineMenu } from 'react-icons/ai'
import MenuCollection from '../components/CollectionMenu/MenuCollection'
import ModalDivDeleteColl from '../modals/ModalDivDeleteColl'
import { ICollection } from '../model'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoadCollectionsPayload, setCheckedPayload, setMenuCollPayload, setMenuWordPayload, setCollectionsPayload } from '../store/collectionsReducer'




const Collections: FC = () => {
    const dispatch = useDispatch()
    const isLoadCollections = useSelector((state: any) => state.collectionsReducer.isLoadCollections)
    const checked = useSelector((state: any) => state.collectionsReducer.checked)
    const menuColl = useSelector((state: any) => state.collectionsReducer.menuColl)
    const cancelDeleteColl = useSelector((state: any) => state.collectionsReducer.cancelDeleteColl)
    const collections = useSelector((state: any) => state.collectionsReducer.collections)
    const setIsLoadColleltions = (value: boolean) => { dispatch(setIsLoadCollectionsPayload(value)) }
    const setChecked = (value: boolean) => { dispatch(setCheckedPayload(value)) }
    const setMenuColl = (value: any) => { dispatch(setMenuCollPayload(value)) }
    const setMenuWord = (value: any) => { dispatch(setMenuWordPayload(value)) }
    const setCollections = (value: any) => { dispatch(setCollectionsPayload(value)) }

    const [addCollectionsVisible, setAddCollectionsVisible] = useState<boolean>(false)
    const [disabledDeleteChecked, setDisabledDeleteChecked] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const userId = localStorage.getItem('userId')
    const arrCheck = JSON.parse(localStorage.getItem(`arrCheck-${userId}`)!)

    const noneOrBlock = show ? 'none' : 'block'
    const styleHide = { display: noneOrBlock }


    useEffect(() => {
        if (localStorage.getItem('delayCollDelete') === null) {
            localStorage.setItem('delayCollDelete', 'true')
        }
    }, [])
    useEffect(() => {
        if (!arrCheck || arrCheck.length === 0) {
            // localStorage.setItem(`arrCheck-${userId}`, JSON.stringify([]))
            setDisabledDeleteChecked(true)
        } else setDisabledDeleteChecked(false)
    }, [arrCheck])

    useEffect(() => {
        getCollections(userId)
            .then(data => setCollections(data))
        setIsLoadColleltions(false)
    }, [checked, isLoadCollections])

    const deleteManyColl = () => {
        deleteManyCollection(arrCheck)
            .then(() => setIsLoadColleltions(true))
            .then(() => localStorage.removeItem(`arrCheck-${userId}`))
            .then(() => localStorage.setItem(`arrCheck-${userId}`, JSON.stringify([])))
    }

    const addMenuColl: any = (id: string) => {
        if (menuColl.includes(id)) {
            setMenuColl('')
            setMenuWord('')
        } else {
            setMenuWord('')
            setMenuColl(id)
        }
    }

    return (
        <div className="collection-list">
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button className="button"
                    onClick={() => { setAddCollectionsVisible(true) }}
                    variant="primary"
                    size="lg"
                >Добавить колекцию
                </Button>
                <CreateCollectionModal show={addCollectionsVisible} onHide={() => setAddCollectionsVisible(false)} />
            </div>
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button className="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setShow(!show)}
                >
                    {show ? 'Показать коллекции' : 'Скрыть коллекции'}
                </Button>
            </div>
            <div
                // ref={hideCollections}
                style={styleHide}
            >
                {collections.map((collection: ICollection) =>
                    <div
                        key={collection._id}
                        className="cardCol">
                        <Card className="cardCol"
                        >
                            <div className="cardCollBasic">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        style={{ cursor: 'pointer' }}
                                        type="checkbox"
                                        value="checked"
                                        onClick={() => setChecked(!checked)}
                                        defaultChecked={isCheckTrue(collection._id)}
                                        onChange={() => handleChange(collection._id)}
                                    />
                                </div>
                                <div className="textFormColl">
                                    {collection.name}
                                </div>
                                {!menuColl.includes(collection._id)
                                    ?
                                    <div className="parentMenu">
                                        <div
                                            className="menu"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <AiOutlineMenu
                                                className="iconMenuColl"
                                                onClick={() => addMenuColl(collection._id)}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <MenuCollection
                                            collId={collection._id}
                                            collName={collection.name}
                                            addMenuColl={addMenuColl}
                                        />
                                    </>
                                }
                            </div>
                        </Card>
                        <ModalDivDeleteColl
                            collId={collection._id}
                            cancelDeleteColl={cancelDeleteColl}
                        />
                    </div>
                )
                }
                <div className="d-grid gap-2 mt-2 mb-2 m-3">
                    <Button
                        className="button"
                        disabled={disabledDeleteChecked}
                        onClick={() => deleteManyColl()}
                        variant="primary"
                        size="lg"
                    >
                        Удалить отмеченные
                    </Button>
                </div>
            </div>
        </div >
    )
}



export default Collections



