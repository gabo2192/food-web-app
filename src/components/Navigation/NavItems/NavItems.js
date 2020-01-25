import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

import NavItem from "./NavItem"

import { AUTH_TOKEN } from "../../../apollo/constants"

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  box-sizing: border-box;
  height: 100%;
  justify-content: space-around;
`

const NavItems = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <Nav>
      <NavItem clicked={props.clicked} link="/">
        Home
      </NavItem>
      <NavItem clicked={props.clicked} link="/menu">
        Menu
      </NavItem>
      <NavItem clicked={props.clicked} link="/promociones">
        Promociones
      </NavItem>
      {!authToken && (
        <NavItem clicked={props.clicked} link="/ingresa">
          Ingresa
        </NavItem>
      )}
      {authToken && (
        <>
          <NavItem clicked={props.clicked} link="/cuenta">
            Cuenta
          </NavItem>
          <NavItem clicked={props.clicked} link="/pedidos">
            Pedidos
          </NavItem>
          <NavItem
            clicked={() => {
              localStorage.removeItem(AUTH_TOKEN)
              navigate("/")
              props.clicked()
            }}
            link="/"
          >
            Cerrar Sesión
          </NavItem>
        </>
      )}
    </Nav>
  )
}

export default NavItems
