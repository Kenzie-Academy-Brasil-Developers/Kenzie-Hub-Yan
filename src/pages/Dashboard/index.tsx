import { useEffect, useState } from "react"
import { SmallButton } from "../../components/Buttons/styles"
import { Headline, Title1, Title2 } from "../../components/Typography/styles"
import { Container, Wrapper } from "./styles"
import { IconButton } from "../../components/Buttons/styles"
import { BsPlusLg } from 'react-icons/bs'
import Card from '../../components/Card'
import Modal from "../../components/Modal"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Navigate } from 'react-router-dom'
import Loading from "../../components/Loading"
import { ModalContext } from "../../contexts/ModalContext"
import { ITechs } from "../../services/getProfile"

export default function Dashboard() {
    const [techList, setTechList] = useState<ITechs[]>([])
    
    const { user, handleLogout, isLoading, isWaiting } = useContext(UserContext)
    
    const { isOpenModalTech, isOpenModalEditTech, setIsOpenModalTech, setIsOpenModalEditTech, setCurrentId, setCurrentTitle, setCurrentStatus } = useContext(ModalContext)

    useEffect(() => {
        setTechList(user?.techs)
    }, [user])

    if(isLoading) {
        return(
            <Loading isOpaque/>
        )
    }

    return(
        <>
        {
            user ?
                <Container>
                    {
                        isOpenModalTech &&
                            <Modal setModalState={setIsOpenModalTech} setTechList={setTechList} />
                    }

                    {
                        isOpenModalEditTech &&
                            <Modal type='edit' setModalState={setIsOpenModalEditTech} setTechList={setTechList} />
                    }

                    <header>
                        <Wrapper>
                            <Title1 color="pink">Kenzie Hub</Title1>
                            <SmallButton onClick={handleLogout}>Sair</SmallButton>
                        </Wrapper>
                    </header>

                    <section>
                        <Wrapper>
                            <Title1>Olá, {user.name}</Title1>
                            <Headline color="grey">{user.course_module}</Headline>
                        </Wrapper>
                    </section>


                    <main>
                        <Wrapper>
                            <div>
                                <Title2>Tecnologias</Title2>
                                <IconButton onClick={() => setIsOpenModalTech(true)}><BsPlusLg /></IconButton>
                            </div>

                            <ul>
                                {
                                    techList?.length > 0 ? 
                                        techList.map(({ title, status, id }, index) => <Card onClick={() => { 
                                            setIsOpenModalEditTech(true)
                                            setCurrentId(id!)
                                            setCurrentTitle(title)
                                            setCurrentStatus(status)
                                        }} key={index} technology={title} level={status}/>)
                                    :
                                        <h1 className="no-item">Nada para mostrar aqui...</h1>
                                }
                            </ul>
                        </Wrapper>
                    </main>
                    {
                        isWaiting &&
                        <Loading/>
                    }
                </Container>
            :
            <Navigate to='/' replace/>
        }
        </>
    )
}