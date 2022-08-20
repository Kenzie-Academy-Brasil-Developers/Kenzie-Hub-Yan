import { AxiosPromise } from "axios"
import api from "./api"
import { IAPIData } from "./getProfile"

export interface IRegisterData {
    email: string,
    password: string,
    confirmPassword?: string,
    name: string,
    bio: string,
    contact: string,
    course_module: string
}

type IAPIDataOmitted = Omit<IAPIData, 'techs' | 'works'>

export default function postRegister(data: IRegisterData): AxiosPromise<IAPIDataOmitted> {
    const response = api.post('users', data)

    return response
}