import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  // const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  return null
}

export default BlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     # site {
//     #   siteMetadata {
//     #     title
//     #   }
//     # }
//     # markdownRemark(fields: { slug: { eq: $slug } }) {
//     #   id
//     #   excerpt(pruneLength: 160)
//     #   html
//     #   frontmatter {
//     #     title
//     #     date(formatString: "MMMM DD, YYYY")
//     #     description
//     #   }
//     # }
//   }
// `
