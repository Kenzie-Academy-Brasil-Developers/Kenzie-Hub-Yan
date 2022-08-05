import { Container, Wrapper, Form } from "./styles"
import { Title1, Label } from '../../components/Typography/styles'
import Input from '../../components/Input/styles'
import { Button } from '../../components/Buttons/styles'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from "../../validators/userSchema"
import api from '../../services/api'
import { useNavigate } from "react-router-dom"
import { errorToast, successToast } from '../../components/Toast/toast'


export default function Login() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const handleLogin = (data) => {
        api.post('sessions', data)
        .then(response => {
            successToast('Login realizado!')

            localStorage.clear()

            localStorage.setItem('@kenzie-hub:user', JSON.stringify(response.data.user))
            localStorage.setItem('@kenzie-hub:token', JSON.stringify(response.data.token))
            navigate('/dashboard', {replace: true})
        }).catch((error) => errorToast('Usuário não encontrado!'))
    }

    return(
        <Container>
            <Title1 color="pink">Kenzie Hub</Title1>
            <Wrapper>
                <Title1>Login</Title1>

                <Form onSubmit={handleSubmit(handleLogin)}>
                    <Label>Email 
                        <Input placeholder="Digite seu email" {...register('email')}/>
                        {
                            errors.email &&
                            <p className='error'>{errors.email?.message}</p>
                        }
                    </Label>

                    <Label>Senha 
                        <Input type='password' placeholder="Digite sua senha" {...register('password')}/>
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
        </Container>
    )
}