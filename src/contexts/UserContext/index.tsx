import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { successToast, errorToast } from '../../components/Toast/toast'
import api from "../../services/api";
import getProfile from "../../services/getProfile";
import postLogin, { IUserLoginData } from "../../services/postLogin";
import postRegister, { IRegisterData } from "../../services/postRegister";
import { IAPIData } from './../../services/getProfile';

export const UserContext = createContext<IUserContextData>({} as IUserContextData)

interface IUserContextData {
    user: IAPIData,
    handleLogin: (data: IUserLoginData) => void,
    handleLogout: () => void,
    handleRegister: (data: IRegisterData) => void,
    isLoading: boolean,
    isWaiting: boolean,
    setIsWaiting: (state: boolean) => void
}

interface IUserProvider {
    children: ReactNode
}

export default function UserProvider({ children }: IUserProvider): JSX.Element {
    const [user, setUser] = useState<IAPIData>({} as IAPIData)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleRegister = (data: IRegisterData) => {
        delete data.confirmPassword
        setIsWaiting(true)

        postRegister(data)
        .then(() => {
            successToast('Usuário cadastrado!')
            navigate('/', {replace: true})
        })
        .catch(() => errorToast('Ocorreu um erro!'))
        .finally(() => setIsWaiting(false))
    }

    const handleLogin = async (data: IUserLoginData) => {
        setIsWaiting(true)

        postLogin(data)
        .then((response) => {
            successToast('Login realizado!')
            setUser(response.data.user)
            localStorage.setItem('@kenzie-hub:token', response.data.token)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            navigate('/dashboard', {replace: true})
        })
        .catch(() => errorToast('Usuário não encontrado!'))
        .finally(() => setIsWaiting(false))
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/', {replace: true})
    }

    useEffect(() => {
        const token = localStorage.getItem('@kenzie-hub:token')

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        getProfile()
        .then((response) => {
            setUser(response.data)
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false))
    }, [])
    
    return(
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, isLoading, isWaiting, setIsWaiting }}>
            {children}
        </UserContext.Provider>
    )
}