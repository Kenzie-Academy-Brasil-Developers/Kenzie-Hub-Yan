import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.1875rem;
    align-items: center;
    background-color: var(--grey-4);
    width: 100%;
    min-height: 100vh;
    padding: 1.875rem 0rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.1875rem;
    align-items: center;
    width: 100%;

    & > h1 {
        font-size: 28px;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 369px;
    gap: 1.375rem;
    border-radius: 4px;
    background-color: var(--grey-3);
    padding: 2.0625rem 1.0625rem;

    & > h1, p {
        text-align: center;
    }

    & > p {
        color: var(--grey-1);
        font-size: .75rem;
        font-weight: 600;
        margin: .875rem 0 .125rem 0;
    }

    & > form > label > p {
        color: var(--negative);
        text-align: start;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    & > button {
        margin-top: .25rem;
    }
`