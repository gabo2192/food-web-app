import React from "react"
import { navigate } from "gatsby"

import { useQuery, useMutation } from "@apollo/react-hooks"
import styled from "styled-components"

import { CURRENT_USER_QUERY } from "./User"
import { TOGGLE_MODAL_MUTATION, LOCAL_STATE_QUERY } from "../layout"

import UpdateUserForm from "../User/UpdateUser"

import Spinner from "../UI/spinner"
import Button from "../UI/button"
import { Heading } from "../Promos/Promos"

const Container = styled.div`
  padding: 1rem;
  max-width: 37.5rem;
  margin: 0 auto;
`

const Account = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  const [toggleModal] = useMutation(TOGGLE_MODAL_MUTATION)
  const { data: localData } = useQuery(LOCAL_STATE_QUERY)
  if (loading) return <Spinner />
  return (
    <>
      <Heading>Hola {data.me.name}</Heading>
      <Container>
        <p>Email: {data.me.email}</p>
        <p>Teléfono {data.me.phone}</p>
        <p>Dirección: {data.me.address}</p>
        <p>
          <Button primary clicked={() => navigate("/pedidos")}>
            Ver pedidos
          </Button>
        </p>
        <p>
          <Button clicked={() => toggleModal()}>Editar información</Button>
        </p>
      </Container>
      {localData.modalOpen && (
        <UpdateUserForm show={localData.modalOpen} modalClosed={toggleModal} />
      )}
    </>
  )
}

export default Account
