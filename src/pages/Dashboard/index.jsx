import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SmallButton } from "../../components/Buttons/styles";
import { Headline, Title1, Title2 } from "../../components/Typography/styles";
import { Container, Wrapper } from "./styles";
import { IconButton } from "../../components/Buttons/styles";
import { BsPlusLg } from 'react-icons/bs'
import Card from '../../components/Card'

export default function Dashboard() {
    const [userName, setUserName] = useState('Visitante')
    const [userModule, setUserModule] = useState('Registre-se para acessar todo o conteúdo')

    useEffect(() => {
        if(localStorage.getItem('@kenzie-hub:user')) {
            const { name, course_module } = JSON.parse(localStorage.getItem('@kenzie-hub:user'))
            
            setUserName(name)
            setUserModule(course_module)
        } 
    }, [userName, userModule])

    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.clear()
        
        navigate('/', {replace: true})
    }

    return(
        <Container>
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
                        <IconButton><BsPlusLg /></IconButton>
                    </div>

                    <ul>
                        <Card technology='ReactJS' level='Intermediário'/>
                    </ul>
                </Wrapper>
            </main>
        </Container>
    )
}