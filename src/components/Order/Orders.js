import React from "react"
import { Link, navigate } from "gatsby"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

import { CURRENT_USER_QUERY } from "../User/User"
import Spinner from "../UI/spinner"
import OrderItems from "./OrderItems"
import Box from "../UI/box"
import Button from "../UI/button"
import { Price } from "../Promos/Promo"
import { USER_ORDERS_QUERY } from "../RequestedOrders/RequestedOrders"
import { TOGGLE_MODAL_MUTATION, LOCAL_STATE_QUERY } from "../layout"
import UpdateUserForm from "../User/UpdateUser"

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder {
    createOrder {
      id
      total
      items {
        id
        title
      }
    }
  }
`

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  & > div {
    text-align: left;
  }
  & > h1 {
    color: ${props => props.theme.primaryColor};
  }
  & > .price {
  }
`

const Orders = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  const [toggleModal] = useMutation(TOGGLE_MODAL_MUTATION)
  const { data: localData } = useQuery(LOCAL_STATE_QUERY)
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION)
  if (loading) return <Spinner />
  return (
    <Container>
      <h1>Hola {data.me.name}</h1>
      <p>Asegúrate que tus datos sean correctos</p>
      <Box padding>
        <p>
          <strong>Correo:</strong> {data.me.email}
        </p>
        <p>
          <strong>Teléfono: </strong>
          {data.me.phone}
        </p>
        <p>
          <strong>Dirección:</strong> {data.me.address}
        </p>
        <Button clicked={() => toggleModal()}>Editar información</Button>
      </Box>
      {localData.modalOpen && (
        <UpdateUserForm show={localData.modalOpen} modalClosed={toggleModal} />
      )}
      <h1>Resumen de tu orden</h1>
      {data.me.cart.map(orderItem => (
        <OrderItems orderItems={orderItem} key={orderItem.id} />
      ))}
      <p>
        <Price>
          Items:{"  "}
          {data.me.cart.reduce(
            (tally, cartItem) => tally + cartItem.quantity,
            0
          )}
        </Price>
      </p>
      <p>
        <Price>
          Total:{" "}
          {data.me.cart
            .reduce(
              (tally, cartItem) => tally + cartItem.price * cartItem.quantity,
              0
            )
            .toLocaleString("es-PE", {
              style: "currency",
              currency: "PEN",
            })}
        </Price>
      </p>
      <p>
        <Button
          primary
          clicked={() => {
            createOrder({
              refetchQueries: [{ query: USER_ORDERS_QUERY }],
            }),
              navigate("/pedidos")
          }}
        >
          Confirmar Orden
        </Button>
      </p>
      <p>
        <Button
          clicked={() => {
            navigate("/menu")
          }}
        >
          Seguir Comprando
        </Button>
      </p>
    </Container>
  )
}

export default Orders
