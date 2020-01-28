import React, { useState } from "react"
import Layout from "../components/layout"
import Login from "../components/Login/Login"
import RequestedOrders from "../components/RequestedOrders/RequestedOrders"
import { AUTH_TOKEN } from "../apollo/constants"

const pedidos = (props, { location }) => {
  const [authToken, setAuthToken] = useState(undefined)
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN))
  }, [])
  return <Layout>{authToken ? <RequestedOrders /> : <Login />}</Layout>
}

export default pedidos
