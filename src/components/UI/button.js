import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  border-color: transparent;
  font-size: 1rem;
  background-color: ${props =>
    props.primary ? props.theme.primaryColor : props.theme.black};
  color: ${props => (props.primary ? props.theme.white : props.theme.white)};
  padding: calc(0.5em - 1px);
  border-radius: ${props=> props.borderRadius ? '0.5rem' : '1rem'};
  margin-bottom: ${props => props.margin && "1.5rem"};
  box-sizing: border-box;
  font-weight: 700;
  width: ${props => (props.submit ? "200px" : "100%")};
  opacity: ${props=> props.disabled && '0.5'};
  box-shadow: ${props =>
    props.primary
      ? "inset 0 1px 1px rgba(168, 27, 27, 0.8), inset 0 -1px 0px rgba(200, 40, 40, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3), 0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #A81B1B"
      : "inset 0 1px 1px rgba(50, 50, 50, 0.8), inset 0 -1px 0px rgba(50, 50, 50, 0.2), 0 9px 16px 0 rgba(50, 50, 50, 0.3), 0 4px 3px 0 rgba(50, 50, 50, 0.3), 50 50 50 1px #000"};

  transition: 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`

const button = props => (
  <StyledButton primary={props.primary} onClick={props.clicked} margin={props.margin} disabled={props.disabled} borderRadius={props.borderRadius}>
    {props.children}
  </StyledButton>
)

export default button
