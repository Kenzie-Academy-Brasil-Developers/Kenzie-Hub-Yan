import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--grey-2);
    border-radius: 4px;
    overflow: hidden;
    height: 70px;
    width: 286px;

    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: .625rem;
        
        & > span {
            display: flex;
            padding: .4375rem .4375rem .375rem .4375rem;
            border-radius: 50%;
            background-color: var(--sucess);
            
            & > svg {
                color: var(--grey-2);
            }
        }

        & > svg {
            cursor: pointer;
            align-self: start;
            width: 18px;
            height: 18px;
            color: var(--grey-1);
        }
    }
`

export const Bar = styled.div`
    height: 6px;
    background-color: var(--sucess);
`