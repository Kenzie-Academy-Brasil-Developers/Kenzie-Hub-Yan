import styled from "styled-components";

const CardStyled = styled.li`
    background-color: var(--grey-4);
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 4px;

    & > div {
        display: flex;
        align-items: center;
        gap: 1.5625rem;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--grey-2);
    }
`

export default CardStyled