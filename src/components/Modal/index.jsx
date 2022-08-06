import { Container, Wrapper, Header, Main } from "./styles"
import { Title3 } from "../Typography/styles"
import { MdOutlineClose } from 'react-icons/md'
import { useEffect, useRef } from "react"

export default function Modal({ title, children, setModalState }) {
    const  modalRef = useRef()

    useEffect(() => {
        const handleOnClick = (event) => {
            if(!modalRef.current.contains(event.target)) {
                setModalState(false)
            }
        }

        document.addEventListener('mousedown', handleOnClick)

        return () => {
            document.removeEventListener('mousedown', handleOnClick)
        }
    }, [])

    return(
        <Container>
            <Wrapper ref={modalRef}>
                <Header>
                    <Title3>{title}</Title3>
                    <MdOutlineClose onClick={() => setModalState(false)}/>
                </Header>
                
                <Main>
                    {children}
                </Main>
            </Wrapper>
        </Container>
    )
}