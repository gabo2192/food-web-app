import React from "react"
import styled from "styled-components"

import Product from "./Product"
import { Container } from "../Menu/Menu"

export const Heading = styled.h1`
  text-align: center;
  padding-top: 1rem;
  color: ${props => props.theme.primaryColor};
  font-weight: 700;
`

const Products = props => (
  <>
    <Heading>{props.title}</Heading>
    <Container>
      {props.products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  </>
)

export default Products
