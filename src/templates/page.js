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
`;

const ImageWithCaption = (gridItem) => {
  console.log(gridItem);
  return (
    <div>
      <img src={gridItem.mediaURL} />
      <p>{gridItem.options.caption}</p>
    </div>
  )
}

const Text = (gridItem) => {
  return (
    <>
      <p>{gridItem.options.text}</p> 
    </>
  )
}
const getGridItemComponent = (type) => {
  switch(type) {
    case "imageWithCaption": return ImageWithCaption;
    case "text": return Text;
    default: return Default;
  }
}

const GridComponent = ({GridDescription, widthPercentage, height, media, mediaType}) => {
  console.log(media);
  const rows = GridDescription.reduce((rows, gd) => Math.max(rows, gd.row_end), 0);
  return (
    <Grid
      style={{
        width: `${widthPercentage}%`,
        height,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {GridDescription.map(gridItem => {
        const Component = getGridItemComponent(gridItem.type);
        return (
          <div style={{
            gridRowStart: gridItem.row_start,
            gridRowEnd: gridItem.row_end + 1,
            gridColumnStart: gridItem.column_start,
            gridColumnEnd: gridItem.column_end + 1,
            background: 'orange',
            color: '#191414',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Component {...gridItem} {...gridItem.type === 'imageWithCaption' ? {mediaURL: media[gridItem.options.mediaIndex].url} : {}}/>
          </div>
        )
      })}
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {data.strapiPage.sections.map(section => {
          const Component = getSectionComponent(section.type)
          return <Component {...section} key={section.id}/>
        })}
      </div>
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
            mediaIndex
            caption
          }
        }
        widthPercentage
        height
        media {
          url
        }
        mediaType
      }
    }
  }
`