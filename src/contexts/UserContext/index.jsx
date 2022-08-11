import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { successToast, errorToast } from '../../components/Toast/toast'
import api from "../../services/api";

export const UserContext = createContext({})

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isWaiting, setIsWaiting] = useState(false)

    const navigate = useNavigate()

    const handleRegister = data => {
        delete data.confirmPassword
        setIsWaiting(true)

        api.post('users', data)
        .then(() => {
            successToast('Usuário cadastrado!')
            navigate('/', {replace: true})
        })
        .catch(error => errorToast('Ocorreu um erro!'))
        .finally(() => setIsWaiting(false))
    }

    const handleLogin = async (data) => {
        setIsWaiting(true)

        api.post('sessions', data)
        .then((response) => {
            successToast('Login realizado!')
            setUser(response.data.user)
            localStorage.setItem('@kenzie-hub:token', response.data.token)
            api.defaults.headers.authorization = `Bearer ${response.data.token}`
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

        api.defaults.headers.authorization = `Bearer ${token}`

        api.get('profile')
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