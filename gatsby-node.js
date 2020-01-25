const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  const category = graphql(
    `
      {
        allContentfulCategory {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors)
      }
      // Resolve the paths to our template
      const menuTemplate = path.resolve("./src/templates/menuTemplate.js")
      // Then for each result we create a page.
      result.data.allContentfulCategory.edges.forEach(edge => {
        createPage({
          path: edge.node.slug,
          component: slash(menuTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error)
    })

  const promo = graphql(
    `
      {
        allContentfulPromotion {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors)
      }
      // Resolve the paths to our template
      const promoTemplate = path.resolve("./src/templates/promoTemplate.js")
      // Then for each result we create a page.
      result.data.allContentfulPromotion.edges.forEach(edge => {
        createPage({
          path: edge.node.slug,
          component: slash(promoTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error)
    })

  return Promise.all([category, promo])
}
