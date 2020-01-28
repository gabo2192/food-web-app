import React, { Component } from "react"
import styled from "styled-components"
import { Mutation } from "@apollo/react-components"
import gql from "graphql-tag"
import { navigate } from "gatsby"

import { Heading } from "../Promos/Promos"
import { AUTH_TOKEN } from "../../apollo/constants"
import { CURRENT_USER_QUERY } from "../User/User"

export const Form = styled.form`
  background: black;
  margin: 0 auto;
  color: white;
  min-height: calc(100vh - 56px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 1rem;
    margin-top: 1.2rem;
    color: white;
    font-size: 1rem;
    font-weight: 200;
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
  & > .button {
    background: ${props => props.theme.primaryColor};
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 4px;
    text-align: center;
  }
`
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
    $phone: String!
    $address: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      phone: $phone
      address: $address
    ) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  }
  render() {
    const { login, email, password, name, phone, address } = this.state
    return (
      <Form onSubmit={e => e.preventDefault()}>
        <Heading>{login ? "Ingresa" : "Registrate"}</Heading>
        {!login && (
          <>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <label htmlFor="email">Contraseña</label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        {!login && (
          <>
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="number"
              name="phone"
              required
              value={phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />
            <label htmlFor="address">Dirección:</label>
            <textarea
              type="text"
              name="address"
              required
              value={address}
              onChange={e => this.setState({ address: e.target.value })}
            />
          </>
        )}
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name, phone, address }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <div className="button" onClick={mutation} >
              {login ? "Ingresa" : "Registrate"}
              {console.log(mutation)}
            </div>
          )}
        </Mutation>

        <div
          className="button"
          onClick={() => this.setState({ login: !login })}
        >
          {login ? "¿Necesitas crear una cuenta?" : "¿Ya tienes una cuenta?"}
        </div>
      </Form>
    )
  }
  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    navigate("/")
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}
export default Login
