import { useEffect, useState } from "react"
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
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Navigate } from 'react-router-dom'
import Loading from "../../components/Loading"


export default function Dashboard() {
    const [techList, setTechList] = useState([])
    const [isOpenModalTech, setIsOpenModalTech] = useState(false)
    const [isOpenModalEditTech, setIsOpenModalEditTech] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentStatus, setCurrentStatus] = useState('')
    
    const { user, handleLogout, isLoading, isWaiting, setIsWaiting } = useContext(UserContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(newTechSchema)
    })

    const handleNewTech = (data) => {
        setIsWaiting(true)

        api.post('users/techs', data)
        .then((response) => {
            successToast('Tecnologia criada com sucesso!')
            setTechList(oldTechList => [...oldTechList, response.data])
            setIsOpenModalTech(false)
        })
        .catch(() => errorToast('Tecnologia já existente!'))
        .finally(() => setIsWaiting(false))
    }

    const handleEditTech = ({ status }) => {
        setIsWaiting(true)

        api.put(`users/techs/${currentId}`, {status})
        .then((response) => {
            setTechList(oldTechList => {
                const filteredList = oldTechList.filter(({ id }) => id !== currentId)
                return [...filteredList, response.data]
            })
            successToast('Tecnologia editada com sucesso!')
            setIsOpenModalEditTech(false)
        })
        .catch(() => errorToast('Ocorreu um erro!'))
        .finally(() => setIsWaiting(false))
    }

    const handleRemoveItem = () => {
        setIsWaiting(true)

        api.delete(`users/techs/${currentId}`)
        .then(() => {
            setTechList(oldTechList => oldTechList.filter(({ id }) => id !== currentId))
            successToast('Tecnologia excluída com sucesso!')
            setIsOpenModalEditTech(false)
        })
        .catch(() => errorToast('Ocorreu um erro!'))
        .finally(() => setIsWaiting(false))
    }

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
                            <Modal title='Cadastrar Tecnologia' setModalState={setIsOpenModalTech}>
                                <Form onSubmit={handleSubmit(handleNewTech)}>
                                    <Label>
                                        Nome
                                        <Input placeholder="Escreva o nome aqui" {...register('title')}/>
                                        {
                                            errors.title &&
                                            <p className='error'>{errors.title?.message}</p>
                                        }
                                    </Label>

                                    <Label>
                                        Selecionar status
                                        <Select {...register('status')}>
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
                                        <Input placeholder="Escreva o nome aqui" {...register('title')} defaultValue={currentTitle}/>
                                        {
                                            errors.title?.message
                                        }
                                    </Label>

                                    <Label>
                                        Status
                                        <Select {...register('status')} defaultValue={currentStatus}>
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
                                            setCurrentId(id)
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