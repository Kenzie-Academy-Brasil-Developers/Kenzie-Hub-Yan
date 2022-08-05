import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { SmallButton, Button } from "../../components/Buttons/styles"
import { Headline, Title1, Title2, Label } from "../../components/Typography/styles"
import { Container, Wrapper } from "./styles"
import { IconButton } from "../../components/Buttons/styles"
import { BsPlusLg } from 'react-icons/bs'
import Card from '../../components/Card'
import api from '../../services/api'
import Modal from "../../components/Modal"
import Input from '../../components/Input/styles'
import Select from '../../components/Select/styles'

export default function Dashboard() {
    const [userName, setUserName] = useState('Visitante')
    const [userModule, setUserModule] = useState('Registre-se para acessar todo o conteúdo')
    const [techList, setTechList] = useState([])
    const [isOpenModalTech, setIsOpenModalTech] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('@kenzie-hub:user')) {
            const { name, course_module } = JSON.parse(localStorage.getItem('@kenzie-hub:user'))
            
            setUserName(name)
            setUserModule(course_module)
        } 
    }, [userName, userModule])

    useEffect(() => {
        const { id } = JSON.parse(localStorage.getItem('@kenzie-hub:user'))

        api.get(`users/${id}`)
        .then(({ data: { techs } }) => setTechList(techs))
        .catch(error => console.log(error))

    }, [techList])

    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.clear()
        
        navigate('/', {replace: true})
    }

    return(
        <Container>
            {
                isOpenModalTech &&
                    <Modal title='Cadastrar Tecnologia' setModalState={setIsOpenModalTech}>
                        <Label>
                            Nome
                            <Input placeholder="Escreva o nome aqui"/>
                        </Label>

                        <Label>
                            Selecionar status
                            <Select>
                                <option value="Iniciante">Iniciante</option>
                                <option value="Intermediário">Intermediário</option>
                                <option value="Avançado">Avançado</option>
                            </Select>
                        </Label>

                        <Button type="submit">Cadastrar Tecnologia</Button>
                    </Modal>
            }

            <header>
                <Wrapper>
                    <Title1 color="pink">Kenzie Hub</Title1>
                    <SmallButton onClick={handleLogout}>Sair</SmallButton>
                </Wrapper>
            </header>

            <section>
                <Wrapper>
                    <Title1>Olá, {userName}</Title1>
                    <Headline color="grey">{userModule}</Headline>
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
                            techList.length > 0 ? 
                                techList.map(({ title, status }) => <Card technology={title} level={status}/>)
                            :
                                <h1 className="no-item">Nada para mostrar aqui...</h1>
                        }
                    </ul>
                </Wrapper>
            </main>
        </Container>
    )
}