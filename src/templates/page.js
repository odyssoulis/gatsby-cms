import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const GridComponent = ({GridDescription, widthPercentage, height}) => {
  console.log(GridDescription);
  return (
    <Grid style={{height}}>
      {GridDescription.map(gridItem => (
        <div style={{
          gridRowStart: gridItem.row_start,
          gridRowEnd: gridItem.row_end,
          gridColumnStart: gridItem.column_start,
          gridColumnEnd: gridItem.column_start,
          background: 'orange',
          color: '#191414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {gridItem.options.text}
        </div>
      ))}
    </Grid>
  );
}

const Default = () => <>I am a default component</>;

const getSectionComponent = (type) => {
  switch(type) {
    case "grid": return GridComponent;
    default: return Default;
  }
}
const BlogPostTemplate = ({ data }) => {
  // const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  return (
    <div>
      {`THIS IS PAGE ${data.strapiPage.Title}`}
      {data.strapiPage.sections.map(section => {
        const Component = getSectionComponent(section.type)
        return <Component {...section} key={section.id}/>
      })}
    </div>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    strapiPage(slug: {eq: $slug}) {
      Title
      sections {
        type
        Description
        Title
        buttonBackground
        buttonText
        buttonTextColor
        id
        link
        GridDescription {
          column_end
          column_start
          row_end
          row_start
          type
          options {
            text
          }
        }
        widthPercentage
        height
      }
    }
  }
`