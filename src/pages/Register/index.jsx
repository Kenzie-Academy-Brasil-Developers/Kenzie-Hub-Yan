import { Container, Wrapper, Form } from '../Login/styles'
import { RegisterStyled } from './styles'
import { Title1, Label, Headline } from '../../components/Typography/styles'
import { Button, SmallButton } from '../../components/Buttons/styles'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/styles'
import Select from '../../components/Select/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../validators/userSchema'
import api from '../../services/api'
import { successToast, errorToast } from '../../components/Toast/toast'

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const navigate = useNavigate()

    const handleRegister = data => {
        delete data.confirmPassword
        
        api.post('users', data)
        .then(() => {
            successToast('Usuário cadastrado!')
            navigate('/', {replace: true})
        })
        .catch(error => errorToast('Ocorreu um erro!'))
    }

    return(
        <RegisterStyled>
            <Container className='container-register'>
                <div className='menu'>
                    <Title1 color='pink'>Kenzie Hub</Title1>
                    <SmallButton onClick={() => navigate('/', {replace: true})}>Voltar</SmallButton>
                </div>

                <Wrapper>
                    <Title1>Crie sua conta</Title1>

                    <Headline className='subtext'>Rapido e grátis, vamos nessa</Headline>

                    <Form onSubmit={handleSubmit(handleRegister)}>
                        <Label>Nome 
                            <Input placeholder="Digite aqui seu nome" {...register('name')}/>
                            {
                                errors.name &&
                                <p className='error'>{errors.name?.message}</p>
                            }
                        </Label>
                        
                        <Label>Email 
                            <Input placeholder="Digite aqui seu email" {...register('email')}/>
                            {
                                errors.email &&
                                <p className='error'>{errors.email?.message}</p>
                            }
                        </Label>

                        <Label>Senha 
                            <Input type='password' placeholder="Digite aqui sua senha" {...register('password')}/>
                            {
                                errors.password &&
                                <p className='error'>{errors.password?.message}</p>
                            }
                        </Label>

                        <Label>Confirmar Senha 
                            <Input type='password' placeholder="Digite novamente sua senha" {...register('confirmPassword')}/>
                            {
                                errors.confirmPassword &&
                                <p className='error'>{errors.confirmPassword?.message}</p>
                            }
                        </Label>

                        <Label>Bio 
                            <Input placeholder="Fale sobre você" {...register('bio')}/>
                            {
                                errors.bio &&
                                <p className='error'>{errors.bio?.message}</p>
                            }
                        </Label>
                        
                        <Label>Contato 
                            <Input placeholder="Opção de contato" {...register('contact')}/>
                            {
                                errors.contact &&
                                <p className='error'>{errors.contact?.message}</p>
                            }
                        </Label>

                        <Label>Selecionar módulo 
                            <Select {...register('course_module')}>
                                <option value='Primeiro módulo (Introdução ao Frontend)'>Primeiro Módulo</option>
                                <option value='Segundo módulo (Frontend Avançado)'>Segundo módulo</option>
                                <option value='Terceiro módulo (Introdução ao Backend)'>Terceiro módulo</option>
                                <option value='Quarto módulo (Backend Avançado)'>Quarto módulo</option>

                            </Select>
                            {
                                errors.course_module &&
                                <p className='error'>{errors.course_module?.message}</p>
                            }
                        </Label>

                        <Button type='submit' status='negative'>Cadastrar</Button>
                    </Form>
                </Wrapper>
            </Container>
        </RegisterStyled>
    )
}