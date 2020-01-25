/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"
import styled, { ThemeProvider } from "styled-components"
import gql from "graphql-tag"
import Spinner from "./UI/spinner"

import "typeface-montserrat"
import "typeface-rubik"

import GlobalStyle from "./styles/globalStyles"
import theme from "./styles/theme"
import { AUTH_TOKEN } from "../apollo/constants"

import Toolbar from "./Navigation/Toolbar"
import SideDrawer from "./Navigation/SideDrawer/SideDrawer"
import Footer from "./Footer/Footer"
import Cart from "./Cart/Cart"

export const LOCAL_STATE_QUERY = gql`
  query {
    menuOpen @client
    cartOpen @client
    modalOpen @client
    orderId @client
  }
`

export const TOGGLE_MENU_MUTATION = gql`
  mutation {
    toggleMenu @client
  }
`
export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`
export const TOGGLE_MODAL_MUTATION = gql`
  mutation {
    toggleModal @client
  }
`

const Main = styled.main`
  margin-top: 56px;
  min-height: calc(100vh - 112px);
  
`

const Layout = ({ children }) => {
  const { loading, error, data } = useQuery(LOCAL_STATE_QUERY)

  const [toggleMenu] = useMutation(TOGGLE_MENU_MUTATION)
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle open={data.cartOpen || data.menuOpen || data.modalOpen} />
      <Toolbar
        drawerToggleClicked={toggleMenu}
        open={data.menuOpen}
        drawerToggleCart={toggleCart}
        cartOpen={data.cartOpen}
      />
      <SideDrawer open={data.menuOpen} drawerToggleClicked={toggleMenu} />
      {authToken && <Cart open={data.cartOpen} drawerToggleCart={toggleCart} fixed/>}
      <div>
        <Main>{children}</Main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
