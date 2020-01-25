import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Promos from "../components/Promos/Promos"

const PromoPage = () => {
  const data = useStaticQuery(graphql`
    query PromoPageQuery {
      contentfulHome {
        promos {
          id
          title
          slug
          description
          promoImage {
            fluid(maxWidth: 2000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          promoPrice
        }
      }
    }
  `)

  const promos = data.contentfulHome.promos

  return (
    <Layout>
      <SEO title="Home" />
      <Promos title="Promociones" promos={promos} />
    </Layout>
  )
}

export default PromoPage
