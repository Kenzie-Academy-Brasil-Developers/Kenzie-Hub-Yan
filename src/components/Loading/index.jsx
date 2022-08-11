import { Container } from "./styles";

export default function Loading({ isOpaque }) {
    return(
        <Container isOpaque={isOpaque}>
            <div className="loader"></div>
        </Container>
    )
}