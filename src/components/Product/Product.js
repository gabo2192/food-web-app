import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import gql from "graphql-tag"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { FaShoppingBag } from "react-icons/fa"

import Box from "../UI/box"
import Button from "../UI/button"
import { Flex, Price } from "../Promos/Promo"
import { TOGGLE_CART_MUTATION } from "../layout"
import { AUTH_TOKEN } from "../../apollo/constants"
import { CURRENT_USER_QUERY } from "../User/User"
import { updateProductUnits } from "../../apollo/utils"

export const StyleLink = styled(Link)`
  border-color: transparent;
  font-size: 1rem;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.white};
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  font-weight: 700;
  width: 100%;
  box-shadow: inset 0 1px 1px rgba(168, 27, 27, 0.8),
    inset 0 -1px 0px rgba(200, 40, 40, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3),
    0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #a81b1b;
  transition: 0.5s;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
  }
`

export const ADD_CART_MUTATION = gql`
  mutation ADD_CART_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $price: Float!
    $quantity: Int!
  ) {
    addToCart(
      title: $title
      description: $description
      image: $image
      price: $price
      quantity: $quantity
    ) {
      id
      title
      description
      image
      price
      quantity
    }
  }
`

const Product = props => {
  const product = props.product
  const { data, loading } = useQuery(CURRENT_USER_QUERY)
  const [addToCart] = useMutation(ADD_CART_MUTATION)
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  const authToken = localStorage.getItem(AUTH_TOKEN)
  const update = (cache, payload) => {
    //first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY })
    const cartItem = payload.data.addToCart

    const existingProductIndex = data.me.cart.findIndex(
      item => item.title === cartItem.title
    )

    const updatedCart =
      existingProductIndex >= 0
        ? updateProductUnits(data.me.cart, cartItem)
        : [...data.me.cart, cartItem]
    data.me.cart = updatedCart
    cache.writeQuery({ query: CURRENT_USER_QUERY, data })
  }

  return (
    <Box padding>
      <h2>{product.title}</h2>
      <Flex row front>
        {product.productImage && <Img fluid={product.productImage.fluid} />}
        <p>{product.description}</p>
      </Flex>
      <Flex padding>
        <Price>
          {product.price &&
            product.price.toLocaleString("es-PE", {
              style: "currency",
              currency: "PEN",
            })}
        </Price>
        {authToken ? (
          <Button
            primary
            disabled={loading}
            clicked={() => {
              addToCart({
                variables: {
                  title: product.title,
                  description: product.description,
                  image: product.productImage.fluid.srcSetWebp,
                  price: product.price,
                  quantity: product.quantity,
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  addToCart: {
                    __typename: "CartItem",
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.productImage.fluid.srcSetWebp,
                    price: product.price,
                    quantity: product.quantity,
                  },
                },
                update,
              })
              toggleCart()
            }}
          >
            <FaShoppingBag /> ¡Ordenar!
          </Button>
        ) : (
          <StyleLink to="/ingresa">
            <FaShoppingBag /> Ingresa y Ordena
          </StyleLink>
        )}
      </Flex>
    </Box>
  )
}

export default Product
