import styled from "styled-components";

export const RegisterStyled = styled.div`
    .container-register {
        gap: 2.5rem;

        .subtext {
            margin-top: .25rem;
        }
    }

    & > .container-register > .menu {
        width: 90%;
        max-width: 369px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > h1 {
            font-size: 1.5rem;
        }
    }
`