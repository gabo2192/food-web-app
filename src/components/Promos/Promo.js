import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import { navigate } from "gatsby"
import { FaShoppingBag } from "react-icons/fa"

import Box from "../UI/box"
import Button from "../UI/button"

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: space-around;
  & > div {
    width: ${props => props.front && "45%"};
    padding: 0.5rem;
  }
  & > p {
    width: ${props => props.front && "45%"};
  }
  @media (min-width: 768px) {
    & > div {
      width: ${props => props.front && "20%"};
    }

    & > p {
      width: ${props => props.front && "70%"};
    }
  }
`
export const Price = styled.span`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.primaryColor};
  width: 100%;
`

const Promo = props => {
  const promo = props.promo
  return (
    <Box padding>
      <h3>{promo.title}</h3>
      <Flex row front>
        {promo.promoImage && <Img fluid={promo.promoImage.fluid} />}
        <p>{promo.description}</p>
      </Flex>
      <Flex padding >
        <Price>
          {promo.promoPrice &&
            promo.promoPrice.toLocaleString("es-PE", {
              style: "currency",
              currency: "PEN",
            })}
        </Price>
        <Button clicked={() => navigate(`${promo.slug}`)} primary>
          <FaShoppingBag /> ¡Ordenar!
        </Button>
      </Flex>
    </Box>
  )
}

export default Promo
