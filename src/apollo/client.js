import ApolloClient, { HttpLink, concat } from "apollo-boost"
import fetch from "isomorphic-fetch"
import { InMemoryCache } from "apollo-cache-inmemory"
import { LOCAL_STATE_QUERY } from "../components/layout"
import { AUTH_TOKEN } from "./constants"

const cache = new InMemoryCache()

export const client = new ApolloClient({
  disableOffline: true,
  uri: "https://fwa-backend-9cf60c10ef.herokuapp.com/fwabackend/prod",
  fetch,
  request: operation => {
    const token = localStorage.getItem(AUTH_TOKEN)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
  cache,
/*   connectToDevTools: true,
 */  clientState: {
    resolvers: {
      Mutation: {
        toggleMenu(_, variables, { cache }) {
          //read the menuOpen value from the cache
          const { menuOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          })
          //write the cart state to the opposite
          const data = {
            data: { ...data, menuOpen: !menuOpen },
          }
          cache.writeData(data)
          return data
        },
        toggleCart(_, variables, { cache }) {
          const { cartOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          })
          const data = {
            data: { ...data, cartOpen: !cartOpen },
          }
          cache.writeData(data)
          return data
        },
        toggleModal(_, variables, { cache }) {
          const { modalOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          })
          const data = {
            data: { ...data, modalOpen: !modalOpen },
          }
          cache.writeData(data)
          return data
        },
        addRequestedOrderId(_, { id }, { cache }) {
          const { orderId } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          })
          const data = {
            data: { ...data, orderId: id, __typename: "OrderId" },
          }
          cache.writeData(data)
          return data
        },
        authToken(_, { token }, { cache }) {
          const { authToken } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          })
          const data = {
            data: { ...data, authToken: token, __typename: "Auth Token" },
          }
          cache.writeData(data)
          return data
        },
      },
    },
    defaults: {
      menuOpen: false,
      cartOpen: false,
      modalOpen: false,
      orderId: null,
    },
  },
})
