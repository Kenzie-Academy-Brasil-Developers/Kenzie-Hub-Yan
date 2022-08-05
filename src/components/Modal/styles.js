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
`