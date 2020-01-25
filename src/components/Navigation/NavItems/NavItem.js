import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    color: ${props=>props.theme.white};
    text-decoration: none;
    & > h1{
        font-weight: 700;
        text-align:center;
    }
    &:hover{
        color: ${props=>props.theme.primaryColor}
    }
`


const NavItem = (props) => (
    <StyledLink onClick={props.clicked} to={props.link}><h1>{props.children}</h1></StyledLink>
)

export default NavItem