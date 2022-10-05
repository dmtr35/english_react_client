import React, {FC} from 'react'
import Modal from "react-bootstrap/Modal"
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'


interface InstructionModalProps {
    show: boolean
    onHide: () => void
}


const InstructionModal: FC<InstructionModalProps> = ({ show, onHide }) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Image
                className='image_info_modal'
                src={info}
            />
        </Modal>
    )
}


export default InstructionModal



