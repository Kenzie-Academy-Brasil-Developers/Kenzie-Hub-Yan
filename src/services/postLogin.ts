import { AxiosPromise } from "axios"
import api from "./api"
import { IAPIData } from "./getProfile"

export interface IUserLoginData {
    email: string,
    password: string
}

interface ILoginData {
    user: IAPIData,
    token: string
}

export default function postLogin(data: IUserLoginData): AxiosPromise<ILoginData> {
    const response = api.post('sessions', data)

    return response
}