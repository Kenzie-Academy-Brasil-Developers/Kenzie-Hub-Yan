import { Container, Wrapper, Form } from "./styles"
import { Title1, Label } from '../../components/Typography/styles'
import Input from '../../components/Input/styles'
import { Button } from '../../components/Buttons/styles'
import Loading from '../../components/Loading'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from "../../validators/userSchema"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"

export default function Login() {
    const { handleLogin, isWaiting } = useContext(UserContext)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    return(
        <Container>
            <Title1 color="pink">Kenzie Hub</Title1>
            <Wrapper>
                <Title1>Login</Title1>

                <Form onSubmit={handleSubmit(handleLogin)}>
                    <Label>Email 
                        <Input placeholder="Digite seu email" autoComplete="email" {...register('email')}/>
                        {
                            errors.email &&
                            <p className='error'>{errors.email?.message}</p>
                        }
                    </Label>

                    <Label>Senha 
                        <Input type='password' placeholder="Digite sua senha" autoComplete="current-password" {...register('password')}/>
                        {
                            errors.password &&
                            <p className='error'>{errors.email?.message}</p>
                        }
                    </Label>

                    <Button type="submit">Entrar</Button>
                </Form>

                <p>Ainda não possui uma conta?</p>

                <Button status='disabled' onClick={() => navigate('/register', {replace: true})}>Cadastrar</Button>
            </Wrapper>
            {
                isWaiting && 
                <Loading/>
            }
        </Container>
    )
}