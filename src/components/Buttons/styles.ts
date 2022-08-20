import styled from "styled-components";

interface ButtonProps {
    status?: string
}

export const Button = styled.button<ButtonProps>`
    color: var(--grey-0);
    border: none; 
    border-radius: 4px;
    padding: .75rem 1.375rem;
    font-size: 1rem;
    font-weight: 500;

    ${({ status }) => status === 'negative' ?
        'background-color: var(--color-primary-negative);'
    : status === 'disabled' ?
        'background-color: var(--grey-1);'
    :
        'background-color: var(--color-primary);'
    }

    &:hover {
        ${({ status }) => status === 'negative' ?
            ''
        : status === 'disabled' ?
            'background-color: var(--grey-2);'
        :
            'background-color: var(--color-primary-focus);'
        }
    }
`

export const SmallButton = styled.button`
    background-color: var(--grey-3);
    padding: .5rem 1rem;
    font-size: .75rem;
    font-weight: 600;
    border: none; 
    border-radius: 4px;
    color: var(--grey-0);

    &:hover {
        background-color: var(--grey-2);
    }
`

export const IconButton = styled.button`
    background-color: var(--grey-3);
    padding: .5625rem .5625rem .375rem .5625rem;
    border: none;
    border-radius: 4px;

    &:hover {
        background-color: var(--grey-2);
    }

    & > svg {
        color: var(--grey-0);
    }
`