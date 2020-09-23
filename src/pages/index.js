import React from "react"
import {graphql} from "gatsby"
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Layout from "../components/layout"
import SEO from "../components/seo"
import useResize from "../hooks/useResize";
import {version} from "react-dom";

const FullScreenVideo = styled.video`
	position: fixed;
	z-index: -100;
`;

const videoAspectRatio = 2880/1800;

const BlogIndex = ({ data }) => {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(1);
  const [videoWidth, setVideoWidth] = React.useState(0);
  const [videoHeight, setVideoHeight] = React.useState(0);
  const resizeTrigger = useResize();
  const videoRef = React.useRef();
  
  React.useEffect(() => {
    if (!window) return;
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, [resizeTrigger])
  
  const windowAspectRatio = React.useMemo(() => windowWidth/windowHeight, [windowWidth, windowHeight]);
  
  React.useEffect(() => {
    if (windowAspectRatio > videoAspectRatio) {
      setVideoWidth(windowWidth)
      setVideoHeight(windowWidth / videoAspectRatio)
    } else {
      setVideoHeight(windowHeight)
      setVideoWidth(windowHeight * videoAspectRatio)
    }
  }, [windowAspectRatio])
  

  return (
    <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, overflow: 'hidden'}}>
      <div style={{width: '100vw', height: '100vh'}}>
        <FullScreenVideo controls autoPlay muted loop ref={videoRef}
          style={{
            width: videoWidth,
            height: videoHeight,
            left: windowAspectRatio < videoAspectRatio ? (windowWidth - videoWidth)/2 : 0,
            top: windowAspectRatio > videoAspectRatio ? (windowHeight - videoHeight)/2 : 0
          }}
        >
          <source src={`${data.strapiHomePage.backgroundVideo.publicURL}`} type="video/mp4" />
        </FullScreenVideo >
      </div>
      <div style={{position: 'absolute', bottom: 0, right: 0, color: 'white', padding: 40}}>
        <ReactMarkdown source={data.strapiHomePage.text} />
        <button
          style={{
            borderRadius: 8,
            border: 'none',
            padding: '4px 8px',
            backgroundColor: data.strapiHomePage.buttonColor,
          }}
        >
          {data.strapiHomePage.buttonText}
        </button>
      </div>
      <SEO title="Home" />
    </div>
  )
}

export default BlogIndex

export const homePageQuery = graphql`
  query {
    strapiHomePage {
      buttonColor
      buttonText
      text
      slug
      backgroundVideo {
        publicURL
      }
    }
  }
`
