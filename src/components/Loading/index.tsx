import { Container } from "./styles";

export interface loadingProps {
    isOpaque?: boolean
}

export default function Loading({ isOpaque }: loadingProps): JSX.Element {
    return(
        <Container isOpaque={isOpaque}>
            <div className="loader"></div>
        </Container>
    )
}