import React, { useEffect } from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { Price } from "../Promos/Promo"
import CartItem from "./CartItem"
import Spinner from "../UI/spinner"
import Button from "../UI/button"
import { AUTH_TOKEN } from "../../apollo/constants"
import { TOGGLE_CART_MUTATION } from "../layout"
import { CURRENT_USER_QUERY } from "../User/User"
import Backdrop from "../UI/backdrop"

const CartStyles = styled.div`
  position: fixed;
  height: calc(100vh - 56px);
  top: 56px;
  max-width: 30rem;
  right: 0;
  width: 100%;
  background-color: #ededed;
  color: black;
  z-index: 100;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  transform: ${props => (props.open ? "translateY(0)" : "translateY(-200%)")};
  text-align: center;
  overflow: scroll;
  display: block;
  @media (min-width: 1366px) {
    height: calc(100vh - 80px);
    top: 80px;
  }
`
const GridHeading = styled.div`
  display: grid;
  grid-template-columns: 1fr 25px;
  align-items: center;
  & > a {
    cursor: pointer;
  }
`

const Cart = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  let authToken = null
  useEffect(
    () => authToken => {
      localStorage.getItem(AUTH_TOKEN)
    },
    []
  )
  if (loading) return null

  let total = 0
  return (
    <>
      {authToken && (
        <>
          <Backdrop show={props.open} clicked={props.drawerToggleCart} />

          <CartStyles open={props.open}>
            <GridHeading>
              <h1>Mi Orden</h1>
              <a onClick={props.drawerToggleCart}>
                <h2>&times;</h2>
              </a>
            </GridHeading>
            {data.me.cart &&
              data.me.cart.map(cartItem => (
                <CartItem cartItem={cartItem} key={cartItem.title} />
              ))}
            <p style={{ display: "none" }}>
              {data.me.cart &&
                data.me.cart.map(
                  cartItem => (total = cartItem.price * cartItem.quantity)
                )}
            </p>
            <p>
              <Price>
                Total:
                <span style={{ marginBottom: "1rem" }}>
                  {total.toLocaleString("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  })}
                </span>
              </Price>
            </p>
            <Button
              primary
              margin
              clicked={() => {
                navigate("/ordenar"), toggleCart()
              }}
            >
              Ordernar ahora
            </Button>
            <Button margin clicked={toggleCart}>
              Seguir Comprando
            </Button>
          </CartStyles>
        </>
      )}
    </>
  )
}

export default Cart
