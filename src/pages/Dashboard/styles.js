import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--grey-4);
    width: 100%;
    min-height: 100vh;

    & > header {
        display: flex;
        justify-content: center;
        padding: 20px 0px;
        border-bottom: .0625rem solid var(--grey-3);
    }

    & > section {
        display: flex;
        justify-content: center;
        border-bottom: .0625rem solid var(--grey-3);
        padding: 2.1875rem 0rem;

        & > div {
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }
    }
`

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
`
