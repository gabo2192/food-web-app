import React from "react"
import styled from "styled-components"
import { FaTrash } from "react-icons/fa"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import Box from "../UI/box"
import { Flex } from "../Promos/Promo"
import AddQuantity from "../UI/addQuantity"
import { CURRENT_USER_QUERY } from "../User/User"
import { findProductIndex } from "../../apollo/utils"

export const REMOVE_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

export const ADD_QUANTITY_MUTATION = gql`
  mutation addQuantity($id: ID!) {
    addQuantity(id: $id) {
      id
    }
  }
`
export const REDUCE_QUANTITY_MUTATION = gql`
  mutation reduceQuantity($id: ID!) {
    reduceQuantity(id: $id) {
      id
    }
  }
`

export const StyledImage = styled.img`
  width: 60px;
  margin: 0;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 200px;
  }
`
const FaTrashStyled = styled(FaTrash)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${props => props.theme.primaryColor};
  transition: 0.1s;
  z-index: 300;
  &:hover {
    transform: scale(1.05);
  }
`

const H2 = styled.h2`
  color: ${props =>
    props.primary ? props.theme.primaryColor : props.theme.black};
  align-self: center;
  text-align: right;
  margin-bottom: 0;
  cursor: pointer;
  padding: 0.5rem;
  transition: 0.1s;
  &:hover {
    color: ${props => props.theme.primaryColor};
    transform: scale(1.2);
  }
`

const CartItem = props => {
  const item = props.cartItem
  const [removeFromCart] = useMutation(REMOVE_CART_MUTATION)
  const [addQuantity] = useMutation(ADD_QUANTITY_MUTATION)
  const [reduceQuantity] = useMutation(REDUCE_QUANTITY_MUTATION)
  const update = (cache, payload) => {
    //first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY })
    // remove the item from the cart
    const cartItemId = payload.data.removeFromCart.id
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId)
    // write back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  }
  return (
    <Box padding>
      <Flex row>
        <FaTrashStyled
          onClick={() => {
            removeFromCart({
              variables: {
                id: item.id,
              },
              update,
              optimisticResponse: {
                __typename: "Mutation",
                removeFromCart: {
                  __typename: "CartItem",
                  id: item.id,
                },
              },
            })
          }}
        />
        <StyledImage srcSet={item.image} alt={item.title} />
        <Flex style={{ width: "65%" }}>
          <h4>{item.title}</h4>
          <p style={{ fontSize: "0.8rem", margin: "0" }}>{item.description}</p>
          <Flex nowidth>
            <AddQuantity
              addUnits={() =>
                addQuantity({
                  variables: { id: item.id },
                  optimisticResponse: {
                    __typename: "Mutation",
                    addQuantity: {
                      __typename: "CartItem",
                      id: item.id,
                    },
                  },
                  update: (cache, payload) => {
                    //first read the cache
                    const data = cache.readQuery({ query: CURRENT_USER_QUERY })
                    const productId = payload.data.addQuantity.id

                    const productIndex = data.me.cart.findIndex(
                      cartItem => cartItem.id === productId
                    )

                    const updatedCart = [...data.me.cart]

                    const existingProduct = updatedCart[productIndex]

                    const updatedUnitsProduct = {
                      ...existingProduct,
                      quantity: existingProduct.quantity + 1,
                    }
                    updatedCart[productIndex] = updatedUnitsProduct
                    data.me.cart = updatedCart
                    // write back to the cache
                    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
                  },
                })
              }
              reduceUnits={() =>
                reduceQuantity({
                  variables: { id: item.id },
                  optimisticResponse: {
                    __typename: "Mutation",
                    reduceQuantity: {
                      __typename: "CartItem",
                      id: item.id,
                    },
                  },
                  update: (cache, payload) => {
                    //first read the cache
                    const data = cache.readQuery({ query: CURRENT_USER_QUERY })
                    const productId = payload.data.reduceQuantity.id

                    const productIndex = data.me.cart.findIndex(
                      cartItem => cartItem.id === productId
                    )
                    const updatedCart = [...data.me.cart]
                    const existingProduct = updatedCart[productIndex]

                    if (existingProduct.quantity >= 2) {
                      const updatedUnitsProduct = {
                        ...existingProduct,
                        quantity: existingProduct.quantity - 1,
                      }
                      updatedCart[productIndex] = updatedUnitsProduct
                      data.me.cart = updatedCart
                      // write back to the cache
                      cache.writeQuery({ query: CURRENT_USER_QUERY, data })
                    } else {
                      const updatedUnitsProduct = {
                        ...existingProduct,
                        quantity: 1,
                      }
                      updatedCart[productIndex] = updatedUnitsProduct
                      data.me.cart = updatedCart
                      // write back to the cache
                      cache.writeQuery({ query: CURRENT_USER_QUERY, data })
                    }
                  },
                })
              }
              quantity={item.quantity}
            />
            <H2 primary>
              {(item.price * item.quantity).toLocaleString("es-PE", {
                style: "currency",
                currency: "PEN",
              })}
            </H2>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default CartItem
