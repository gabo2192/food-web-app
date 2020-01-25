import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"
import Modal from "../UI/modal"
import Spinner from "../UI/spinner"
import { Heading } from "../Promos/Promos"

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      items {
        description
        id
        image
        price
        quantity
        title
      }
      total
      createdAt
    }
  }
`

const Container = styled.div`
  padding: 1rem;
  & > p,
  li {
    font-size: 0.8rem;
    margin: 0;
  }
  & > h5 {
    margin-bottom: 0;
  }
`

const SingleOrder = props => {
  const { loading, error, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: props.id },
  })
  return (
    <Modal show={props.show} modalClosed={props.modalClosed}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading>Pedido</Heading>
          <Container>
            {data.order.items.map(item => (
              <React.Fragment key={item.id}>
                <h5>{item.title}</h5>
                <ul>
                  <li>{item.description}</li>
                  <li>Cantidad: {item.quantity}</li>
                </ul>
              </React.Fragment>
            ))}
            <h3>
              Total:{" "}
              {data.order.total.toLocaleString("es-PE", {
                style: "currency",
                currency: "PEN",
              })}
            </h3>
          </Container>
        </>
      )}
    </Modal>
  )
}

export default SingleOrder
