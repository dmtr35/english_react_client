import React, { useContext } from "react"
import { Navbar } from "react-bootstrap"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { useNavigate } from "react-router-dom"
import { LOGIN_ROUTE } from "../utils/consts"
import { FaBook } from 'react-icons/fa'



const TypeBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" expand="lg" >
            <Container fluid >
                <div className="logo">
                    <FaBook size={28} className='icon_book_logo' />
                    <Navbar.Brand style={{ color: 'white' }}>English easy</Navbar.Brand>
                </div>

                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>

                </Navbar.Collapse>
                <Button
                    onClick={() => logOut()}
                    variant="secondary"
                    style={{ background: '#0946A1', border: 'none' }}
                    className="m-1">Log out</Button>
            </Container>
        </Navbar>
    )
})





export default TypeBar