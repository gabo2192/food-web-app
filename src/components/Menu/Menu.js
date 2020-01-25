import React from "react"
import styled from "styled-components"
import { Heading } from "../Promos/Promos"
import MenuItem from "./MenuItem"

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1366px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Menu = props => {
  return (
    <>
      <Heading>Carta</Heading>
      <Container>
        {props.menu.map(menu => (
          <MenuItem key={menu.id} menu={menu} />
        ))}
      </Container>
    </>
  )
}

export default Menu
