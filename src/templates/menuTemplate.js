import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Products from "../components/Product/Products"

const Menu = ({ data }) => {
  const { title, products } = data.contentfulCategory
  return (
    <Layout>
      <Products title={title} products={products}/>
    </Layout>
  )
}

export default Menu

export const menuQuery = graphql`
  query MenuQuery($slug: String) {
    contentfulCategory(slug: { eq: $slug }) {
      id
      slug
      title
      products {
        id
        title
        description
        price
        quantity
        productImage {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`
