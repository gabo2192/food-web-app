import React from "react"
import gql from "graphql-tag"
import Box from "../UI/box"
import Button from "../UI/button"
import { Price } from "../Order/OrderItems"
import { useMutation } from "@apollo/react-hooks"
import { TOGGLE_MODAL_MUTATION } from "../layout"

const ADD_ORDERID_MUTATION = gql`
  mutation ADD_ORDERID_MUTATION($id: String!) {
    addRequestedOrderId(id: $id) @client
  }
`

const RequestedOrder = props => {
  const { id, items, total, updatedAt } = props.order
  const options = {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const [toggleModal] = useMutation(TOGGLE_MODAL_MUTATION)
  const [addRequestedOrderId] = useMutation(ADD_ORDERID_MUTATION)
  return (
    <>
      <Box padding>
        <h4>Pedido: {id}</h4>
        <h4>
          Total:{" "}
          <Price>
            {total.toLocaleString("es-PE", {
              style: "currency",
              currency: "PEN",
            })}
          </Price>
        </h4>
      
        <p style={{ textTransform: "capitalize" }}>
          {new Date(updatedAt).toLocaleDateString("es-PE", options)}
        </p>
        <Button
          clicked={() => {
            addRequestedOrderId({ variables: { id } })
            toggleModal()
          }}
        >
          Ver detalles
        </Button>
      </Box>
    </>
  )
}

export default RequestedOrder
