import { Title3, Headline } from '../Typography'
import CardStyle from './styles'
import { CgTrash } from 'react-icons/cg'

export default function Card({ technology, level }) {
    return(
        <CardStyle>
            <Title3>{technology}</Title3>
            <div>
                <Headline color='grey'>{level}</Headline>
                <CgTrash />
            </div>
        </CardStyle>
    )
}