import styled, { keyframes } from "styled-components";

const loaderAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    background-color: ${({isOpaque}) => isOpaque ? 'var(--grey-4)' : 'rgba(18, 18, 20, 0.5)'};

    .loader {
        border: .5rem solid var(--grey-1);
        border-top: .5rem solid var(--color-primary);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: ${loaderAnimation} 0.6s infinite linear;
    }
`