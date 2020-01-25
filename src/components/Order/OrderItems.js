import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Box from "../UI/box"
import { Flex } from "../Promos/Promo"
import { StyledImage } from "../Cart/CartItem"

export const Price = styled.span`
  color: ${props => props.theme.primaryColor};
  font-weight: 700;
  margin-right: 0.2rem;
`

const OrderItems = props => {
  const orderItems = props.orderItems
  return (
    <Box padding>
      <Flex row>
        <Flex>
          <h3 style={{ marginBottom: "0.2rem", textAlign: "center" }}>
            {orderItems.title}
          </h3>
          <span>{orderItems.description}</span>
          <Flex>
            <span style={{ textAlign: "center" }}>
              Cantidad: <Price>{orderItems.quantity}</Price>
            </span>
            <span style={{ textAlign: "center" }}>
              Precio:{" "}
              <Price>
                {orderItems.price.toLocaleString("es-PE", {
                  style: "currency",
                  currency: "PEN",
                })}
              </Price>
            </span>

            <span style={{ textAlign: "center" }}>
              Total:{" "}
              <Price>
                {(orderItems.price * orderItems.quantity).toLocaleString(
                  "es-PE",
                  {
                    style: "currency",
                    currency: "PEN",
                  }
                )}
              </Price>
            </span>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default OrderItems
