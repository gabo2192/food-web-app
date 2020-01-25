import React from "react"
import { Query, useQuery } from "react-apollo"
import gql from "graphql-tag"
import PropTypes from "prop-types"

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      phone
      address
      permissions
      cart {
        id
        title
        description
        image
        title
        price
        quantity
      }
      orders {
        id
        items {
          id
          title
          description
          image
          price
          quantity
        }
        total
        updatedAt
      }
    }
  }
`

/* const User = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  )
}

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
 */
