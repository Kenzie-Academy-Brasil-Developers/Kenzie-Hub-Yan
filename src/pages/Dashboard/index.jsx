import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { SmallButton, Button } from "../../components/Buttons/styles"
import { Headline, Title1, Title2, Label } from "../../components/Typography/styles"
import { Container, Wrapper, Form } from "./styles"
import { IconButton } from "../../components/Buttons/styles"
import { BsPlusLg } from 'react-icons/bs'
import Card from '../../components/Card'
import api from '../../services/api'
import Modal from "../../components/Modal"
import Input from '../../components/Input/styles'
import Select from '../../components/Select/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { newTechSchema } from "../../validators/techSchema"
import { successToast, errorToast } from '../../components/Toast/toast'
import axios from "axios"


export default function Dashboard() {
    const [userName, setUserName] = useState('Visitante')
    const [userModule, setUserModule] = useState('Registre-se para acessar todo o conteúdo')
    const [techList, setTechList] = useState([])
    const [isOpenModalTech, setIsOpenModalTech] = useState(false)
    const [isOpenModalEditTech, setIsOpenModalEditTech] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [editedTitle, setEditedTitle] = useState('')
    const [editedStatus, setEditedStatus] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(newTechSchema)
    })

    const configsApi = {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('@kenzie-hub:token'))}` 
        }
    }
    
    const handleNewTech = (data) => {
        api.post('users/techs', data, configsApi)
        .then((response) => {
            successToast('Tecnologia criada com sucesso!')
            setTechList(oldTechList => [...oldTechList, response.data])
            setIsOpenModalTech(false)
        })
        .catch(() => errorToast('Tecnologia já existente!'))
    }

    const handleEditTech = (data) => {
        api.put(`users/techs/${currentId}`, data, configsApi)
        .then((response) => {
            setTechList(oldTechList => {
                const filteredList = oldTechList.filter(({ id }) => id !== currentId)
                return [...filteredList, response.data]
            })
            successToast('Tecnologia editada com sucesso!')
            setIsOpenModalEditTech(false)
        })
        .catch(() => errorToast('Ocorreu um erro!'))
    }

    const handleRemoveItem = () => {
        api.delete(`users/techs/${currentId}`, configsApi)
        .then(() => {
            setTechList(oldTechList => oldTechList.filter(({ id }) => id !== currentId))
            successToast('Tecnologia excluída com sucesso!')
            setIsOpenModalEditTech(false)
        })
        .catch(() => errorToast('Ocorreu um erro!'))
    }

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
    }, [])

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
                        <Form onSubmit={handleSubmit(handleNewTech)}>
                            <Label>
                                Nome
                                <Input placeholder="Escreva o nome aqui" {...register('title')} defaultValue={editedTitle}/>
                                {
                                    errors.title &&
                                    <p className='error'>{errors.title?.message}</p>
                                }
                            </Label>

                            <Label>
                                Selecionar status
                                <Select defaultValue={editedStatus} {...register('status')}>
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </Select>
                            </Label>

                            <Button type="submit">Cadastrar Tecnologia</Button>
                        </Form>
                    </Modal>
            }

{
                isOpenModalEditTech &&
                    <Modal title='Tecnologia Detalhes' setModalState={setIsOpenModalEditTech}>
                        <Form onSubmit={handleSubmit(handleEditTech)}>
                            <Label className='disabled-input'>
                                Nome do projeto
                                <Input placeholder="Escreva o nome aqui" {...register('title')} defaultValue={editedTitle}/>
                                {
                                    errors.title &&
                                    <p className='error'>{errors.title?.message}</p>
                                }
                            </Label>

                            <Label>
                                Status
                                <Select defaultValue={editedStatus} {...register('status')}>
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </Select>
                            </Label>

                            <div className="button-wrapper">
                                <Button status='negative' type="submit">Salvar alterações</Button>
                                <Button type="button" status='disabled' onClick={handleRemoveItem}>Excluir</Button>
                            </div>
                        </Form>
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
                                techList.map(({ title, status, id }, index) => <Card onClick={() => { 
                                    setIsOpenModalEditTech(true)
                                    setCurrentId(id)
                                    setEditedTitle(title)
                                    setEditedStatus(status)
                                }} key={index} technology={title} level={status}/>)
                            :
                                <h1 className="no-item">Nada para mostrar aqui...</h1>
                        }
                    </ul>
                </Wrapper>
            </main>
        </Container>
    )
}