import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useMutation } from "@apollo/react-hooks"
import Img from "gatsby-image"
import styled from "styled-components"

import { FaTrashAlt, FaShoppingBag } from "react-icons/fa"

import Layout, { TOGGLE_CART_MUTATION } from "../components/layout"
import { Heading } from "../components/Promos/Promos"
import Button from "../components/UI/button"
import { ADD_CART_MUTATION } from "../components/Product/Product"
import { AUTH_TOKEN } from "../apollo/constants"
import { StyleLink } from "../components/Product/Product"
import { CURRENT_USER_QUERY } from "../components/User/User"

const PromoText = styled.div`
  padding: 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  & > p {
    color: ${props => props.theme.primaryColor};
    font-weight: 800;
  }
  & > h2 {
    color: ${props => props.theme.primaryColor};
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
  }
`

const Selected = styled.div`
  position: relative;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.primaryColor};
  font-weight: 700;
  border-radius: 3px;
  box-shadow: 0 0 10px #555;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  width: 100%;
  border: transparent;
  margin: 1rem;
  & > button {
    padding: 1rem;
    border: transparent;
    background: rgba(0, 0, 0, 0);
    cursor: pointer;
    & > svg.icon {
      pointer-events: none;
    }
  }
`
const BoxButton = styled.button`
  position: relative;
  background-color: ${props => props.theme.white};
  border-radius: 3px;
  box-shadow: 0 0 10px #555;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 0;
  width: 100%;
  border: transparent;
  cursor: pointer;
  & > h4 {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0.5rem;
    background: black;
    color: white;
    pointer-events: none;
  }
`
const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  max-height: 300px;
  pointer-events: none;

`

const Ingredients = styled.div`
  padding: 1rem;
  padding-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  grid-auto-rows: 7rem;
`

const PromoIntro = styled.div``

const Grid = styled.div`
  height: 100vh;
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80vh;
  }
`

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${props => props.theme.primaryColor};
  }
  @media (min-width: 1024px) {
    margin-top: 56px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`

const Promo = ({ data }) => {
  const {
    id,
    title,
    promoImage,
    quantity,
    description,
    itemsFixed,
    promoPrice,
    select1Info,
    select1Quantity,
    select1,
    select2Info,
    select2Quantity,
    select2,
  } = data.contentfulPromotion
  const [firstSelect, setFirstSelect] = useState([])
  const [secondSelect, setSecondSelect] = useState([])
  const [addCart] = useMutation(ADD_CART_MUTATION)
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  const [authToken, setAuthToken] = useState(undefined)
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN))
  }, [])

  const productDescription = `${itemsFixed.map(
    item => item.title
  )}, ${firstSelect}, ${secondSelect}`
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
    <Layout>
      <Grid>
        <PromoIntro>
          <Heading>{title}</Heading>
          <StyledImg className="main" fluid={promoImage.fluid} />
          <PromoText>{description}</PromoText>
          <Ingredients>
            {itemsFixed.map(ingredient => (
              <BoxButton key={ingredient.id}>
                <StyledImg
                  fluid={ingredient.productImage.fluid}
                  style={{ position: "absolute" }}
                />
                <h4>{ingredient.title}</h4>
              </BoxButton>
            ))}
          </Ingredients>
        </PromoIntro>
        <Scroll>
          {select1 && (
            <>
              {!firstSelect ? (
                <PromoText>{select1Info}:</PromoText>
              ) : (
                <PromoText>
                  {select1Info}:
                  <p>
                    {select1Quantity - firstSelect.length > 0
                      ? `Puedes elegir ${select1Quantity -
                          firstSelect.length} item
                ${select1Quantity - firstSelect.length > 1 ? "s." : "."}`
                      : "Elimina un item si quieres cambiar"}
                  </p>
                  {firstSelect.map(item => (
                    <Selected style={{ margin: "0" }} key={Math.random()}>
                      Elegiste : {item}{" "}
                      <button
                        value={item}
                        onClick={e => {
                          let item = e.target.value
                          setFirstSelect(firstSelect.filter(e => e !== item))
                        }}
                      >
                        <FaTrashAlt className="icon" />
                      </button>
                    </Selected>
                  ))}
                </PromoText>
              )}
              <Ingredients>
                {select1.map(select => (
                  <BoxButton
                    className="select"
                    key={select.id}
                    value={select.title}
                    onClick={e => {
                      let item = e.target.value
                      if (firstSelect.includes(select.title)) {
                        return setFirstSelect(
                          firstSelect.filter(e => e !== item)
                        )
                      } else if (firstSelect.length >= select1Quantity) {
                        return alert("No puedes elegir más")
                      } else {
                        return setFirstSelect([...firstSelect, select.title])
                      }
                    }}
                    style={
                      firstSelect.includes(select.title)
                        ? { border: "red 3px solid" }
                        : {}
                    }
                  >
                    <StyledImg
                      fluid={select.productImage.fluid}
                      style={{ position: "absolute" }}
                    />
                    <h4>{select.title}</h4>
                  </BoxButton>
                ))}
              </Ingredients>
            </>
          )}
          {select2 && (
            <>
              {!secondSelect ? (
                <PromoText>{select2Info}:</PromoText>
              ) : (
                <PromoText>
                  {select2Info}:
                  <p>
                    {select2Quantity - secondSelect.length > 0
                      ? `Puedes elegir ${select2Quantity -
                          secondSelect.length} item
                ${select2Quantity - secondSelect.length > 1 ? "s." : "."}`
                      : "Elimina un item si quieres cambiar"}
                  </p>
                  {secondSelect.map(item => (
                    <Selected style={{ margin: "0" }} key={Math.random()}>
                      Elegiste: {item}{" "}
                      <button
                        value={item}
                        onClick={e => {
                          let item = e.target.value
                          setSecondSelect(secondSelect.filter(e => e !== item))
                        }}
                      >
                        <FaTrashAlt className="icon" />
                      </button>
                    </Selected>
                  ))}
                </PromoText>
              )}
              <Ingredients>
                {select2.map(select => (
                  <BoxButton
                    className="select"
                    key={select.id}
                    value={select.title}
                    onClick={e => {
                      let item = e.target.value
                      if (secondSelect.includes(select.title)) {
                        return setSecondSelect(
                          secondSelect.filter(e => e !== item)
                        )
                      } else if (secondSelect.length >= select2Quantity) {
                        return alert("No puedes elegir más")
                      } else {
                        return setSecondSelect([...secondSelect, select.title])
                      }
                    }}
                    style={
                      secondSelect.includes(select.title)
                        ? { border: "red 3px solid" }
                        : {}
                    }
                  >
                    <StyledImg
                      fluid={select.productImage.fluid}
                      style={{ position: "absolute" }}
                    />
                    <h4>{select.title}</h4>
                  </BoxButton>
                ))}
              </Ingredients>
            </>
          )}
          <PromoText>
            {promoPrice && (
              <h2>
                {promoPrice.toLocaleString("es-PE", {
                  style: "currency",
                  currency: "PEN",
                })}
              </h2>
            )}
            {authToken ? (
              <Button
                primary
                clicked={() => {
                  addCart({
                    variables: {
                      title,
                      description: productDescription,
                      image: promoImage.fluid.srcSetWebp,
                      price: promoPrice,
                      quantity,
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      addToCart: {
                        __typename: "CartItem",
                        id,
                        title,
                        description: productDescription,
                        image: promoImage.fluid.srcSetWebp,
                        price: promoPrice,
                        quantity,
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
          </PromoText>
        </Scroll>
      </Grid>
    </Layout>
  )
}

export default Promo

export const promoQuery = graphql`
  query PromoQuery($slug: String) {
    contentfulPromotion(slug: { eq: $slug }) {
      id
      title
      description
      promoPrice
      quantity
      promoImage {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      itemsFixed {
        id
        title
        productImage {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      select1Info
      select1Quantity
      select1 {
        id
        title
        productImage {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      select2Info
      select2Quantity
      select2 {
        id
        title
        productImage {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`
