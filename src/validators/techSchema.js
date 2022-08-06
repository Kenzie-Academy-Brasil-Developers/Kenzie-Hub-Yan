import * as yup from 'yup'

export const newTechSchema = yup.object().shape({
    title: yup
    .string()
    .required('Campo obrigatório!')
})