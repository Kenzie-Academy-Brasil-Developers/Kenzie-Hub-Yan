import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'

export default function RoutesMain() {
    return(
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/homepage' element={<Home />}></Route>
            <Route path='*' element={<Navigate to='/' replace/>}/>
        </Routes>
    )
}