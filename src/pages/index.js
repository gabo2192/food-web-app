import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/Hero/Hero"
import SEO from "../components/seo"
import Promos from "../components/Promos/Promos"
import Menu from "../components/Menu/Menu"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      contentfulHome {
        featurePromos {
          id
          title
          slug
          description
          promoImage {
            fluid(maxWidth:2000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          promoPrice
        }
        promos {
          id
          title
          slug
          description
          quantity
          promoImage {
            fluid(maxWidth:2000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          promoPrice
        }
        menu {
          id
          title
          slug
          categoryImage {
            fluid (maxWidth:2000){
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  `)

  const featuredPromos = data.contentfulHome.featurePromos
  const promos = data.contentfulHome.promos
  const menu = data.contentfulHome.menu

  return (
    <Layout>
      <SEO title="Home" />
      <Hero featured={featuredPromos}/>
      <Promos title="Promociones" promos={promos}/>
      <Menu menu={menu}/>
    </Layout>
  )
}

export default IndexPage
