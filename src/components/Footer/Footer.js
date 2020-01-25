import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  background-color: black;
  padding: 1rem;
  color: white;
  & > a {
      color: white;
      text-decoration: none;
  }
`

const Footer = props => {
  return (
    <StyledFooter>
      Designed and developed by{" "}
      <a href="https://elarconsultingla.com">Elar Consulting</a>
    </StyledFooter>
  )
}

export default Footer
