import styled from "styled-components";

export const Select = styled.select`
    color: var(--grey-1);
    background-color: var(--grey-2);
    border: none;
    border-radius: 4px;
    padding: .75rem 1rem;
    cursor: pointer;

    &::placeholder {
        font-size: 1rem;
        font-weight: 400;
    }

    &:focus {
        outline: .075rem solid var(--grey-0);
    }

    &:focus::placeholder {
        color: var(--grey-0);
    }
`

export default Select