import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import BackgroundImage from 'gatsby-background-image'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const ImageContained = styled(Img)`
  & > picture > img {
    object-fit: cover !important;
  }
`;

const ImageWithCaption = (gridItem) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
      {/* <div style={{flex: 1}}> */}
      {gridItem.options.mediaType === 'video'
        ? <video style={{width: '100%', height: 'auto'}} autoPlay muted loop>
            <source src={`${gridItem.media.publicURL}`} type="video/mp4" />
          </video>
        :
          <ImageContained
            // Tag="section"
            fluid={gridItem.media.childImageSharp.fluid}
            // backgroundColor={`#040e18`}
          />
      
      }
          {/* <h2>gatsby-background-image</h2> */}
        {/* </BackgroundImage> */}
      {/* <Img fluid={gridItem.media.childImageSharp.fluid} /> */}
      {/* </div> */}
      {/* <p style={{height: 100}}>{gridItem.options.caption}</p> */}
    </div>
  )
}

const Text = (gridItem) => {
  console.log(gridItem);
  return (
    <>
      <p>{gridItem.options.text}</p> 
    </>
  )
}

const CTAButton = styled(Link)`
  height: 40px;
  padding: 0 12px;
  display: flex;
  border-radius: 4px;
  align-items: center;
  text-decoration: none;
  box-shadow: none;
`;

const CTA = ({Title, Description, link, buttonBackground, buttonTextColor, buttonText}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '48px 0'}}>
      <h3>{Title}</h3>
      <p>{Description}</p>
      <CTAButton to={link} style={{backgroundColor: buttonBackground, color: buttonTextColor}}>
        {buttonText}
      </CTAButton>
    </div>
  )
}
const getGridItemComponent = (type) => {
  switch(type) {
    case "imageWithCaption": return ImageWithCaption;
    case "text": return Text;
    default: return Default;
  }
}

const GridComponent = ({GridDescription, widthPercentage, height, mediaFile_1, mediaFile_2, mediaType}) => {
  const media = [mediaFile_1, mediaFile_2];
  const rows = GridDescription.reduce((rows, gd) => Math.max(rows, gd.row_end), 0);
  return (
    <Grid
      style={{
        width: `${widthPercentage}%`,
        height,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }}
    >
      {GridDescription.map((gridItem, index) => {
        const Component = getGridItemComponent(gridItem.type);
        return (
          <div
            key={index}
            style={{
              gridRowStart: gridItem.row_start,
              gridRowEnd: gridItem.row_end + 1,
              gridColumnStart: gridItem.column_start,
              gridColumnEnd: gridItem.column_end + 1,
              background: 'orange',
              color: '#191414',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Component {...gridItem} {...gridItem.type === 'imageWithCaption' ? {media: media[gridItem.options.mediaFileIndex - 1]} : {}}/>
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
    case "cta": return CTA;
    default: return Default;
  }
}
const BlogPostTemplate = ({ data }) => {
  // const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext
  const {strapiPage : {sections}} = data;
  const [shown, setShown] = React.useState(sections);
  console.log(sections);
  return (
    <div>
      {`THIS IS PAGE ${data.strapiPage.Title}`}
      <button onClick={() => setShown(shown.filter(s => s.type !== "cta"))}>filter cta</button>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {shown.map(section => {
          const Component = getSectionComponent(section.type)
          return <Component {...section} key={`${section.type}/${section.id}`}/>
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
          # title
          Description
          # image {
          #   url
          #   imageFile {
          #     childImageSharp {
          #       fluid {
          #           ...GatsbyImageSharpFluid
          #       }
          #     }
          #   }
          # }
        # }
      }
      # sections {
      #   type
      #   Description
      #   Title
      #   buttonBackground
      #   buttonText
      #   buttonTextColor
      #   id
      #   link
        # GridDescription {
        #   options {
        #     caption
        #   }
        # }
        # widthPercentage
        # height
        # mediaFile_1 {
        #   childImageSharp {
        #     fluid(maxWidth: 960) {
        #       ...GatsbyImageSharpFluid
        #     }
        #   }
        #   publicURL
        # }
        # mediaFile_2 {
        #   childImageSharp {
        #     fluid(maxWidth: 960) {
        #       ...GatsbyImageSharpFluid
        #     }
        #   }
        #   publicURL
        # }
        # mediaFile_3 {
        #   childImageSharp {
        #     fluid(maxWidth: 960) {
        #       ...GatsbyImageSharpFluid
        #     }
        #   }
        # }
        # mediaType
      # }
    }
  }
`