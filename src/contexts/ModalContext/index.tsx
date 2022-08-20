import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext<IModalProviderData>({} as IModalProviderData)

interface IModalProviderProps {
    children: ReactNode
}

interface IModalProviderData {
    isOpenModalTech: boolean,
    isOpenModalEditTech: boolean,
    currentId: string,
    currentTitle: string,
    currentStatus: string,
    setIsOpenModalTech: (state: boolean) => void,
    setIsOpenModalEditTech: (state: boolean) => void,
    setCurrentId: (state: string) => void,
    setCurrentTitle: (state: string) => void,
    setCurrentStatus: (state: string) => void
}

export default function ModalProvider({ children }: IModalProviderProps): JSX.Element {
    const [isOpenModalTech, setIsOpenModalTech] = useState<boolean>(false)
    const [isOpenModalEditTech, setIsOpenModalEditTech] = useState<boolean>(false)
    const [currentTitle, setCurrentTitle] = useState<string>('')
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [currentId, setCurrentId] = useState<string>('')

    return(
        <ModalContext.Provider value={{isOpenModalTech, isOpenModalEditTech, currentId, currentTitle, currentStatus, setIsOpenModalTech, setIsOpenModalEditTech, setCurrentId, setCurrentTitle, setCurrentStatus}}>
            { children }
        </ModalContext.Provider>
    )
}