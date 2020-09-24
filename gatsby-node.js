const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  
  const getTemplate = slug => {
    switch(slug) {
      case "/": return path.resolve('./src/templates/homepage.js')
      default: return path.resolve('./src/templates/page.js')
    }
  }
  
  const result = await graphql(
    `
      {
        allStrapiPage {
          nodes {
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const allStrapiPages = result.data.allStrapiPage.nodes.map(({slug}) => slug);

  allStrapiPages.forEach((slug) => {
    createPage({
      path: slug,
      component: getTemplate(slug),
      context: {
        slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
