import React, { useState } from "react"

import { AUTH_TOKEN } from "../apollo/constants"
import Layout from "../components/layout"
import Login from "../components/Login/Login"
import Account from "../components/User/Account"

const Cuenta = () => {
  const [authToken, setAuthToken] = useState(undefined)
  useEffect(() => {
    setAuthToken(localStorage.getItem(AUTH_TOKEN))
  }, [])

  return <Layout>{authToken ? <Account /> : <Login />}</Layout>
}

export default Cuenta
