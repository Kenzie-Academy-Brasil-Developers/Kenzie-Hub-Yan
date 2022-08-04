import { Container, Bar } from './styles'
import { Title3 } from '../Typography/styles'
import { BsCheckLg } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'


export default function Toast() {
    const [isVisible, setIsVisible] = useState(true)

    return(
        <AnimatePresence>
        {
            isVisible &&
        <motion.div initial={{x: -500}} animate={{x: 50}} exit={{x: -500}} transition={{transition: 100}}>
            <Container>
                <div>
                    <span><BsCheckLg /></span>
                    <Title3>Conta criada com sucesso!</Title3>
                    <MdClose />
                </div>
                <Bar />
            </Container>
        </motion.div>
        }
        </AnimatePresence>
    )
}