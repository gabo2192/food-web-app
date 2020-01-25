import React from 'react'
import styled from 'styled-components'

const StyledBox = styled.div`
    position:relative;
    background-color: ${props=>props.theme.white};
    border-radius: 3px;
    box-shadow: 0 0 10px #ddd;
    display: flex;
    padding: ${props=> props.padding &&  "1.25rem"};
    overflow: hidden;
    margin-top: 1.25rem;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-bottom: 1.5rem;
    flex-direction: column;
    justify-content: space-around;
    & > h3 {
        text-align: center;
        padding-top: 1rem;
        color: ${props => props.theme.primaryColor};
        font-weight: 700;
    }
    & > h2 {
        text-align: center;
        & > span {
            color: ${props => props.theme.white}
        }
    }
`

const box = (props) =>(
    <StyledBox padding={props.padding}>{props.children}</StyledBox>
)

export default box;