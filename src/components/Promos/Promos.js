import React from "react"
import styled from "styled-components"

import Promo from "./Promo"
import { Container } from "../Menu/Menu"

export const Heading = styled.h1`
  text-align: center;
  padding-top: 1rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 700;
  @media (min-height: 768px), (min-width: 1366px) {
    padding-top: 2rem;
  }
`


const Promos = props => (
  <>
    <Heading>{props.title}</Heading>
    <Container>
      {props.promos.map(promo => (
        <Promo key={promo.id} promo={promo} />
      ))}
    </Container>
  </>
)

export default Promos
