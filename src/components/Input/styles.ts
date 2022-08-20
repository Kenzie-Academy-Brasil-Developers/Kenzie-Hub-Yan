import styled from "styled-components";

const Input = styled.input`
    color: var(--grey-0);
    background-color: var(--grey-2);
    border: none;
    border-radius: 4px;
    padding: .75rem 1rem;

    &::placeholder {
        font-size: 1rem;
        font-weight: 400;
        color: var(--grey-1);
    }

    &:focus {
        outline: .075rem solid var(--grey-0);
    }

    &:focus::placeholder {
        color: var(--grey-0);
    }
`

export default Input