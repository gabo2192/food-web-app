import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import { FaShoppingBag } from "react-icons/fa"
import { navigate } from "gatsby"

import Button from "../UI/button"

const Hero = styled.div`
  height: calc(100vh - 56px);
  position: relative;
`
const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
`

const HeroText = styled.div`
  position: absolute;
  top: 10%;
  height: 80%;
  width: 100%;
  padding-right: 3rem;
  padding-left: 3rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  align-items: center;
  & > h1 {
    color: ${props => props.theme.primaryColor};
    font-weight: 700;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
  }
  & > p.button {
    width: 100%;
  }
  @media (min-width: 768px) {
    top: 10%;
    height: 50%;
    & > p.button {
      width: 50%;
    }
  }
  @media (min-width: 1024px) {
    top: 30%;
    height: 60%;
    width: 80%;
    left: 10%;
    border-radius: 1rem;
    & > p.button {
      width: 50%;
    }
  }
`

const HeroSingle = props => {
  const product = props.product
  return (
    <Hero>
      <StyledImg
        fluid={product.promoImage.fluid}
        style={{ position: "absolute", top: "0" }}
      />
      <HeroText>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h1>
          {product.promoPrice.toLocaleString("es-PE", {
            style: "currency",
            currency: "PEN",
          })}
        </h1>
        <p className="button">
          <Button primary clicked={() => navigate(`${product.slug}`)}>
            <FaShoppingBag /> Ordena aquí
          </Button>
        </p>
        <p className="button" style={{ marginBottom: "0" }}>
          <Button clicked={() => navigate("/promociones ")}>
            <FaShoppingBag /> Ver Promociones
          </Button>
        </p>
      </HeroText>
    </Hero>
  )
}

export default HeroSingle
