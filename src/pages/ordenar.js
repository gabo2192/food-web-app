import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Orders from "../components/Order/Orders"
import Login from "../components/Login/Login"
import { AUTH_TOKEN } from "../apollo/constants"

const ordenarPage = props => {
  const [authToken, setAuthToken] = useState(undefined)
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN))
  }, [])

  return <Layout>{authToken ? <Orders /> : <Login />}</Layout>
}

export default ordenarPage
