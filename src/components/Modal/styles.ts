import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    background-color: rgba(18, 18, 20, 0.5);
`

export const Wrapper = styled.div`
    width: 90%;
    max-width: 369px;
    background-color: var(--grey-3);
    border-radius: 4px;
    overflow: hidden;
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--grey-2);
    padding: .875rem 1.25rem;

    svg {
        font-size: 18px;
        color: var(--grey-1);
        cursor: pointer;
    }
`

export const Main = styled.main`
    padding: 1.375rem 1.375rem 2rem 1.375rem;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    label > .error {
        color: var(--negative);
    }

    .button-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 15px 0px;
    }

    .button-wrapper > button {
        width: 100%;
    }

    .disabled-input {
        pointer-events: none;
        filter: brightness(0.75);
    }

    @media screen and (min-width: 425px) {
        .button-wrapper > button {
            width: max-content;
        }

        .button-wrapper > button:last-child {
        width: 40%;
        }
    }
`