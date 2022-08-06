import { Title3, Headline } from '../Typography/styles'
import CardStyle from './styles'

export default function Card({ technology, level, onClick }) {
    return(
        <CardStyle onClick={onClick}>
            <Title3>{technology}</Title3>
            <div>
                <Headline color='grey'>{level}</Headline>
            </div>
        </CardStyle>
    )
}