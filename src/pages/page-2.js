import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading } from "../components/Promos/Promos"
import Button from "../components/UI/button"
import Box from "../components/UI/box"

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
  padding: 0;
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
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
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

const SecondPage = () => {
  const [quantity, setQuantity] = useState([])
  const [material, setMaterial] = useState([])
  const totalPrice = (material, quantity) => {
    let price = 0
    if (material === "Couche 115gr") {
      if (quantity >= 50000) {
        price = 0.0414
        return price
      }
      if (quantity >= 20000) {
        price = 0.0535
        return price
      }

      if (quantity >= 15000) {
        price = 0.055
        return price
      }

      if (quantity >= 10000) {
        price = 0.062
        return price
      }

      if (quantity >= 5000) {
        price = 0.078
        return price
      }

      if (quantity >= 3000) {
        price = 0.088
        return price
      }
      if (quantity >= 1000) {
        price = 0.13
        return price
      }
    }
    if (material === "Couche 150gr") {
      if (quantity >= 50000) {
        price = 0.04676
        return price
      }
      if (quantity >= 20000) {
        price = 0.05965
        return price
      }

      if (quantity >= 15000) {
        price = 0.06127
        return price
      }

      if (quantity >= 10000) {
        price = 0.0682
        return price
      }

      if (quantity >= 5000) {
        price = 0.0846
        return price
      }

      if (quantity >= 3000) {
        price = 0.095
        return price
      }
      if (quantity >= 1000) {
        price = 0.14
        return price
      }
    }
  }

  return (
    <Layout>
      <Heading>Volantes</Heading>
      <StyledImg src="http://publicocos.com/wp-content/uploads/2019/11/imprimir-flyers-volantes-10x20.jpg" />
      <PromoText>
        <ul>
          <li>Precios no incluyen IGV</li>
          <li>Recojo en tienda (Delivery S/15 opcional)</li>
          <li>Entregas desde 24 horas</li>
          <li>Atendemos pedidos de provincias</li>
        </ul>
        <form>
          <label>
            Cantidad
            <select onChange={e => setQuantity(e.target.value)}>
              <option value=" " selected>
                Elige la cantidad
              </option>
              <option value={+1000}>1,000</option>
              <option value={+3000}>3,000</option>
              <option value={+5000}>5,000</option>
              <option value={+10000}>10,000</option>
              <option value={+15000}>15,000</option>
              <option value={+20000}>20,000</option>
              <option value={+50000}>50,000</option>
            </select>
          </label>
          <br />
          <label>
            Material
            <select onChange={e => setMaterial(e.target.value)}>
              <option value="" selected>
                Elige el material
              </option>
              <option value="Couche 115gr">Couche 115gr</option>
              <option value="Couche 150gr">Couche 150gr</option>
            </select>
          </label>
        </form>
        <p>Precio unitario desde: S/. {totalPrice("Couche 115gr", 20000)} </p>
        {totalPrice(material, quantity) && (
          <p>Precio unitario S/. {totalPrice(material, quantity)} </p>
        )}
        <Heading>
          Precio Total: S/.{" "}
          {totalPrice(material, quantity)
            ? totalPrice(material, quantity) * quantity
            : "0"}
        </Heading>
        <Button></Button>
      </PromoText>
    </Layout>
  )
}

export default SecondPage
