import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { FaShoppingBag } from "react-icons/fa"
import { useQuery } from "@apollo/react-hooks"

import DrawerToggle from "./SideDrawer/DrawerToggle"
import { CURRENT_USER_QUERY } from "../User/User"
import { AUTH_TOKEN } from "../../apollo/constants"

const Flex = styled.div`
  display: flex;
  align-items: center;
  & > a {
    cursor: pointer;
    & > svg {
      height: 1.5rem;
      width: 1.5rem;
      color: ${props => props.theme.white};
      pointer-events: none;
    }
  }
`
const Header = styled.header`
  position: fixed;
  z-index: 300;
  display: flex;
  width: 100%;
  color: white;
  padding: 0.5rem 1rem;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  transition: 0.1s;
  background-color: ${props => (props.active ? "black" : "black")};
  top: 0;
  & > h3 {
    margin: 0;
    font-weight: 500;
  }
  @media (min-width: 1200px) {
    display: flex;
    height: 80px;
  }
`

const StyleImage = styled(Link)`
  height: 36px;
  display: flex;
  color: white;
  align-items: center;
  text-decoration: none;
  & > div {
    min-width: 50px;
    max-height: 36px;
  }
  & > h2 {
    margin: 0;
  }
  @media (min-width: 1440px) {
    height: 60px;
    width: 155px;
  }
`
const NumberItems = styled.span`
  position: absolute;
  text-align: center;
  right: 0;
  background: ${props => props.theme.primaryColor};
  border-radius: 50%;
  font-size: 0.6rem;
  padding: 0.2rem;
  line-height: 0.8rem;
  min-width: 0.8rem;
  font-weight: 100;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
  transition: 0.5s;
`

const Toolbar = props => {
  const logo = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxHeight: 60) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  let authToken = null
  useEffect(
    () => authToken => {
      localStorage.getItem(AUTH_TOKEN)
    },
    []
  )

  const beforeData = (
    <Header active={props.open}>
      <StyleImage
        to="/"
        onClick={() => {
          props.cartOpen && props.drawerToggleCart()
          props.open && props.drawerToggleClicked()
        }}
      >
        <Img
          fluid={logo.placeholderImage.childImageSharp.fluid}
          imgStyle={{ objectFit: "contain" }}
        />
        <h2>Pollo's</h2>
      </StyleImage>

      <Flex>
        <DrawerToggle clicked={props.drawerToggleClicked} active={props.open} />
      </Flex>
    </Header>
  )

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  if (loading) return beforeData
  return (
    <Header active={props.open}>
      <StyleImage
        to="/"
        onClick={() => {
          props.cartOpen && props.drawerToggleCart()
          props.open && props.drawerToggleClicked()
        }}
      >
        <Img
          fluid={logo.placeholderImage.childImageSharp.fluid}
          imgStyle={{ objectFit: "contain" }}
        />
        <h2>Pollo's</h2>
      </StyleImage>

      <Flex>
        {authToken && (
          <a onClick={props.drawerToggleCart} style={{ position: "relative" }}>
            <FaShoppingBag />
            {data && data.me.cart && data.me.cart.length > 0 && (
              <NumberItems>
                {data.me.cart.reduce(
                  (tally, cartItem) => tally + cartItem.quantity,
                  0
                )}
              </NumberItems>
            )}
          </a>
        )}
        <DrawerToggle clicked={props.drawerToggleClicked} active={props.open} />
      </Flex>
    </Header>
  )
}

export default Toolbar
