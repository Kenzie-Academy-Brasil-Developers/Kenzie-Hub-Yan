import { AxiosPromise } from "axios"
import api from "./api"

export interface ITechs {
    id?: string,
    title: string,
    status: string
}

interface IWorks {
    title: string,
    description: string 
}

export interface IAPIData {
    id: string,
    name: string,
    email: string,
    course_module: string,
    bio: string,
    contact: string,
    techs: ITechs[],
    works: IWorks[],
    created_at: string,
    updated_at: string,
    avatar_url: null
}

export default function getProfile(): AxiosPromise<IAPIData> {
    const response = api.get('profile')

    return response
}