import React, { useContext, useState, useEffect } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'


const Instructions = observer(({ show, onHide }) => {
    console.log(show);
    

    
    


    return (
        <Modal
            className='qqq'
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
                    {/* <div className='modal-content'> */}
                        <Image
                            className='image_info_modal'
                            src={info}
                        />
                    {/* </div> */}
        </Modal>
    )
})


export default Instructions



