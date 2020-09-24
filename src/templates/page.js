import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data }) => {
  // const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext
  console.log('the data are', data);

  return (
    <div>
      {`THIS IS PAGE ${data.strapiPage.Title}`}
    </div>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    strapiPage(slug: {eq: $slug}) {
      Title
      Sections {
        Description
        Title
        buttonBackground
        buttonText
        buttonTextColor
        id
        link
        type
      }
    }
  }
`