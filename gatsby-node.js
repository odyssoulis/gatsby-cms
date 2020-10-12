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

// Copygatsby-node.js: copy code to clipboard
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//   // Only update the `/app` page.
//   if (page.path.match(/^\/grid/)) {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = "/grid/*"
//     // Update the page.
//     createPage(page)
//   }
// }

exports.createResolvers = async ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
}) => {
    const { createNode } = actions

    await createResolvers({
        STRAPI_UploadFile: {
            imageFile: {
                type: 'File',
                async resolve(source) {
                    let sourceUrl = `YOUR_URL${source.url}`

                    return await createRemoteFileNode({
                        url: sourceUrl,
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    })
                },
            },
        },
    })
}

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-editor-js/,
            use: loaders.null(),
          },
          {
            test: /@editorjs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};