import React, { useState } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"

import RequestedOrder from "./RequestedOrder"
import Spinner from "../UI/spinner"
import { Heading } from "../Promos/Promos"
import SingleOrder from "./SingleOrder"
import { TOGGLE_MODAL_MUTATION, LOCAL_STATE_QUERY } from "../layout"
import { Container } from "../Menu/Menu"

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      updatedAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`

const RequestedOrders = props => {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY)
  const [toggleModal] = useMutation(TOGGLE_MODAL_MUTATION)
  const { data: localData } = useQuery(LOCAL_STATE_QUERY)
  if (loading) return <Spinner />
  if (error)
    return (
      <Layout>
        <p>No pudimos obtener tus ordenes</p>
      </Layout>
    )
  return (
    <>
      <Heading>Pedidos</Heading>
      <Container>
        {data &&
          data.orders &&
          data.orders.map(order => (
            <RequestedOrder order={order} key={order.id} />
          ))}
      </Container>
      {localData.modalOpen && localData.orderId && (
        <SingleOrder
          show={localData.modalOpen}
          modalClosed={toggleModal}
          id={localData.orderId}
        />
      )}
    </>
  )
}

export default RequestedOrders
