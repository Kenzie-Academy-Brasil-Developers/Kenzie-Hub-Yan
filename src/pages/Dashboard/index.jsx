import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SmallButton } from "../../components/Buttons/styles";
import { Headline, Title1, Title2 } from "../../components/Typography/styles";
import { Container, Wrapper } from "./styles";

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
                <div>
                    <Title1>Olá, {userName}</Title1>
                    <Headline color="grey">{userModule}</Headline>
                </div>
            </section>


            <main>
                <Title2></Title2>
            </main>
        </Container>
    )
}