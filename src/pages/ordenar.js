import React, { useEffect } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "graphql-tag"

import Layout from "../components/layout"
import Spinner from "../components/UI/spinner"
import Orders from "../components/Order/Orders"
import Login from "../components/Login/Login"
import { AUTH_TOKEN } from "../apollo/constants"



const ordenarPage = props => {
    const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <Layout>
      {authToken ? <Orders /> : <Login /> }
    </Layout>
  )
}

export default ordenarPage
