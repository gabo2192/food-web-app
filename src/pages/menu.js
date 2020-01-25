import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/Menu/Menu"

const MenuPage = () => {
  const data = useStaticQuery(graphql`
    query MenuPageQuery {
      contentfulHome {
        menu {
          id
          title
          slug
          categoryImage {
            fluid(maxWidth: 2000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  `)

  const menu = data.contentfulHome.menu

  return (
    <Layout>
      <SEO title="Menu" />
      <Menu menu={menu} /> 
    </Layout>
  )
}

export default MenuPage
