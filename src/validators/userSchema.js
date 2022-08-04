import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Campo obrigatório!'),
    password: yup.string().required('Campo obrigatório!')
})


export const registerSchema = yup.object().shape({
    name: yup.string().min(3, 'O nome precisa de no mínimo 3 dígitos!').required('Campo obrigatório!'),
    email: yup.string().email('Email inválido').required('Campo obrigatório!'),
    password: yup.string().min(8, 'A senha deve conter no mínimo 8 dígitos!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'A senha precisa conter pelo menos uma letra maiúscula, um caractere especial e um número').required('Campo obrigatório!'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas não batem'),
    bio: yup.string().required('Campo obrigatório!'),
    contact: yup.string().required('Campo obrigatório!')
})