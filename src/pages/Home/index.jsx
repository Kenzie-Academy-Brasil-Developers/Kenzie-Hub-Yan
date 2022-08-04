import { Container } from "../Login/styles";
import { Title1, Title2 } from "../../components/Typography/styles";
import { SmallButton } from "../../components/Buttons/styles";
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        
        navigate('/', {replace: true})
    }

    return(
        <Container>
            <Title1 color="pink">Kenzie Hub</Title1>
            <Title2>Em desenvolvimento...</Title2>
            <SmallButton onClick={handleLogout}>logout</SmallButton>
        </Container>
    )
}