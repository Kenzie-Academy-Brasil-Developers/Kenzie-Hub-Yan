import { Title3, Headline } from '../Typography/styles'
import CardStyle from './styles'

interface CardProps {
    technology: string,
    level: string,
    onClick: () => void
}

export default function Card({ technology, level, onClick }: CardProps): JSX.Element {
    return(
        <CardStyle onClick={onClick}>
            <Title3>{technology}</Title3>
            <div>
                <Headline color='grey'>{level}</Headline>
            </div>
        </CardStyle>
    )
}