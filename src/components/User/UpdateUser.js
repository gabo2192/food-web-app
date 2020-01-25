import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from "styled-components"

import { CURRENT_USER_QUERY } from "./User"
import Spinner from "../UI/spinner"
import Modal from "../UI/modal"
import { Heading } from "../Promos/Promos"

const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $name: String
    $email: String
    $phone: String
    $address: String
  ) {
    updateUser(name: $name, email: $email, phone: $phone, address: $address) {
      id
    }
  }
`
const Form = styled.form`
  margin: 0 auto;
  min-height: calc(100vh - 56px);
  display: block;
  flex-direction: column;
  justify-content: center;
  & > .button {
    background: ${props => props.theme.primaryColor};
    color: white;
    text-transform: uppercase;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 4px;
    text-align: center;
    width: 100%;
  }
  & > fieldset {
    border: transparent;
    & > label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 1rem;
      font-size: 1rem;
      margin-left: 1rem;
    }
    & > input,
    textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid white;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
`

const UpdateUserForm = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  const [name, setName] = useState(" ")
  const [email, setEmail] = useState(" ")
  const [phone, setPhone] = useState(" ")
  const [address, setAddress] = useState(" ")
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  if (loading) return <Spinner />
  return (
    <Modal show={props.show} modalClosed={props.modalClosed}>
      {loading ? (
        <Spinner />
      ) : (
        <Form
          update
          onSubmit={e => {
            e.preventDefault()
            updateUser({
              variables: { name, email, phone, address },
              refetchQueries: [{ query: CURRENT_USER_QUERY }],
            })
            props.modalClosed()
          }}
        >
          {useEffect(() => {
            const updateUser = () => {
              setAddress(data.me.address)
              setPhone(data.me.phone)
              setEmail(data.me.email)
              setName(data.me.name)
            }
            return updateUser()
          }, [])}
          <Heading>Actualiza tu información</Heading>
          <fieldset disabled={loading}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="phone">Teléfono:</label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <label htmlFor="address">Dirección:</label>
            <textarea
              type="text"
              name="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </fieldset>
          <input
            type="submit"
            className="button"
            value={`Actualiz${loading ? "ando" : "ar"}`}
            disabled={loading}
          />
        </Form>
      )}
    </Modal>
  )
}

export default UpdateUserForm
