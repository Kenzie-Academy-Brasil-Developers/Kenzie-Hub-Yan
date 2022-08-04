import styled from "styled-components";

const CardStyled = styled.li`
    background-color: var(--grey-4);
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.375rem;
    border-radius: 4px;

    & > div {
        display: flex;
        align-items: center;
        gap: 1.5625rem;

        > svg {
            color: var(--grey-0);
        }
    }
`

export default CardStyled